const tf = require('@tensorflow/tfjs');

/** ---------- Vectorized Linear Regression Gradient Descent ----------
        step 1: Constructor to make "features" and "labels" into tensors
        step 2: Standardization 
        step 3: Append a column of 1's to the "features" tensor
        step 4: Make a tensor for our weights as well with initial values 0
        step 5: Slope of MSE with respect to B and M =        Features Transpose * ((Features*Weights)-Labels)
                                                            ---------------------------------------------------
                                                                                    n
              Labels   = Tensor of our label data
              Features = Tensor of our feature data
              n        =  Number of observations
              weights  =  M and B in a tensor  
        
        step 6: Custom Optimization of Learning Rate
        Vectorized Mean Squared Error = sum( ((Features*Weights)-Labels)sqrt 2 )
                                        ---------------------------------------
                                                        n             
----------------------------------------------------------------------------------------------*/

class LinearRegression {
    /* --------------------- initial class ------------------------------  */
    constructor(features, labels, options) {
        this.features = this.processFeatures(features); //step 1, step 2 and step 3
        this.labels = tf.tensor(labels);//step 1
        this.weights = tf.zeros([this.features.shape[1], 1]) //step 4: Make a tensor for our weights as well
        this.options = Object.assign({ learningRate: 0.1, iterations: 1000 }, options);
        this.mseHistory = [];
        this.bHistory = [];
    }

    /* ------------ step 5: Slope of MSE with respect to B and M get the optimal values ------------*/
    gradientDescent(features, labels) {
        /* step 1: Calculate Current Guess  "mx+b" = Features * Weights by using Matrix Multiplication */
        const currentGuessess = features.matMul(this.weights);
        /* step 2: Difference =  Current Guess  - Labels  */
        const differences = currentGuessess.sub(labels);
        /* step 3: Slope of MSE with respect to B and M */
        const slopes = features
            .transpose()
            .matMul(differences)
            .div(features.shape[0]);
        /* step 4: Multiply both slopes by learning rate and Subtract*/
        this.weights = this.weights.sub(slopes.mul(this.options.learningRate));

    }

    /* ------------------ Training data ------------------*/
    train() {
        console.log(' ............. Training calling ............. ')
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize);
        for (let i = 0; i < this.options.iterations; i++) {
            for (let j = 0; j < batchQuantity; j++) {
                const { batchSize } = this.options;
                const startIndex = j * batchSize;
                const featuresSlice = this.features.slice([startIndex, 0], [batchSize, -1])
                const labelsSlice = this.labels.slice([startIndex, 0], [batchSize, -1])
                this.gradientDescent(featuresSlice, labelsSlice);
            }
            // console.log(' mseHistory : ', this.mseHistory)
            // console.log(' Learning Rate : ', this.options.learningRate)
            // using dataSync get the B value
            const dataSync = this.weights.dataSync();
            const b = dataSync[0];
            this.bHistory.push(b)
            this.recordMSE();
            this.updateLearningRate();
        }
    }

    /* ------------------ Test data ------------------ */
    test(testFeatures, testLabels) {
        console.log(' ............. Test calling ............. ')
        /* step 1: Constructor to make "features" and "labels" into tensors */
        /* step 2: Standardization */
        /* step 3: Append a column of 1's to the "features" tensor */
        testFeatures = this.processFeatures(testFeatures);
        testLabels = tf.tensor(testLabels);
        /* step 4: calculate  Predictions "mx+b" = testFeatures * Weights by using Matrix Multiplication */
        const predictions = testFeatures.matMul(this.weights);
        // console.log(' ***********************************  : ',);
        // console.log(' Test Predictions "b+m1x1+m2x2"  : ',);
        // const a = predictions.concat(testLabels, 1)
        // a.print();

        /* step 5: calculate  Sum Squares of Residuals  (SS(res)) */
        const res = testLabels
            .sub(predictions)
            .pow(2)
            .sum()
            .dataSync();
        // console.log('  Sum Squares of Residuals : ', res[0]);

        /* step 6: calculate  Total Sum of  Squares (SS(tot)) */
        const tot = testLabels
            .sub(testLabels.mean())
            .pow(2)
            .sum()
            .dataSync();
        // console.log('Total Sum of  Squares : ', tot[0]);
        /* step 7: calculate Coefficent of Determination ( R2 )*/
        const R2 = 1 - (res[0] / tot[0])
        return R2
    }

    /* ------------------ Make Prediction ------------------*/
    predict(observations) {
        console.log(' ............. Predict calling ............. ')
        /*      observations 
           [
               ['install', 'uom', 'readings'],
               ['install', 'uom', 'readings'],
               ['install', 'uom', 'readings']
           ]  
        */
        const predict = this.processFeatures(observations).matMul(this.weights);
        return predict.arraySync()
    }

    /* ++++++++++++++++++++++++++++++++++++++++  Helper() ++++++++++++++++++++++++++++++++++++++++  */
    /* ---------------------- Helper() : Process Features ----------------------------  */
    processFeatures(features) {
        //step 1: Constructor to make "features" into tensors
        features = tf.tensor(features);
        //step 2: Standardization 
        /* not first time */
        if (this.mean && this.variance) {
            features = features.sub(this.mean).div(this.variance.pow(0.5))
        } else {
            /* first time only */
            features = this.standardize(features)
        }
        //step 3: Append a column of 1's to the "features" tensor
        features = tf.ones([features.shape[0], 1]).concat(features, 1)
        return features
    }

    /* --------------------- Helper() : Standardization ------------------------------  */
    standardize(features) {
        const { mean, variance } = tf.moments(features, 0)
        this.mean = mean;
        this.variance = variance;
        return features.sub(mean).div(variance.pow(0.5))
    }

    /* --------------------- : Learning Rate Optimisation :------------------------------  */
    /* ---------------------- Helper() : Record MSE values-----------------------------  */
    recordMSE() {
        const mse = this.features.matMul(this.weights)
            .sub(this.labels)
            .pow(2)
            .sum()
            .div(this.features.shape[0])
            .dataSync() // only single value not tensor
        // console.log('mse  : ', mse[0]);
        this.mseHistory.unshift(mse[0]); // latest entry on to top
    };

    /* --------------------- Helper() : Update Learning Rate ------------------------------  */
    updateLearningRate() {
        /* history must have more than 2  values */
        if (this.mseHistory.length < 2) {
            return;
        }
        /* MSE went up  = bad update  then devide by 2*/
        if (this.mseHistory[0] > this.mseHistory[1]) {
            this.options.learningRate /= 2;
        }
        /* MSE went down : it is right direction  then multiply with 5% */
        else {
            this.options.learningRate *= 1.05
        }
    }




} // end of class

module.exports = LinearRegression;

