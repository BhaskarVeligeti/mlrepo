const tf = require('@tensorflow/tfjs');

/** ---------- Multinominal Logistic Regression ----------
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

class LogisticRegression {
    /* --------------------- initial class ------------------------------  */
    constructor(features, labels, options) {
        this.features = this.processFeatures(features); //step 1, step 2 and step 3
        this.labels = tf.tensor(labels);//step 1
        this.weights = tf.zeros([this.features.shape[1], this.labels.shape[1]]) //step 4: Make a tensor for our weights as well
        this.options = Object.assign({ learningRate: 0.1, iterations: 1000 }, options);
        this.costHistory = [];
        this.bHistory = [];
    }

    /* ------------ step 5: Slope of MSE with respect to B and M get the optimal values ------------*/
    gradientDescent(features, labels) {
        /* step 1: Calculate Current Guess  "mx+b" = Features * Weights by using Matrix Multiplication */
        const currentGuessess = features.matMul(this.weights).softmax();
        /* step 2: Difference =  Current Guess  - Labels  */
        const differences = currentGuessess.sub(labels);
        /* step 3: Slope of MSE with respect to B and M */
        const slopes = features
            .transpose()
            .matMul(differences)
            .div(features.shape[0]);
        /* step 4: Multiply both slopes by learning rate and Subtract*/
        return this.weights.sub(slopes.mul(this.options.learningRate));

    }

    /* ------------------ Training data ------------------*/
    train() {
        console.log(' ............. Training calling ............. ')
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize);
        for (let i = 0; i < this.options.iterations; i++) {
            for (let j = 0; j < batchQuantity; j++) {
                const startIndex = j * this.options.batchSize;
                const { batchSize } = this.options;
                this.weights = tf.tidy(() => {
                    const featuresSlice = this.features.slice([startIndex, 0], [batchSize, -1])
                    const labelsSlice = this.labels.slice([startIndex, 0], [batchSize, -1])
                    return this.gradientDescent(featuresSlice, labelsSlice);
                })
            }
            // using dataSync get the B value
            const dataSync = this.weights.dataSync();
            const b = dataSync[0];
            // console.log(' B value : ', b)
            this.bHistory.push(b);
            this.recordCost();
            this.updateLearningRate();
        }
    }

    /* ------------------ Make Prediction ------------------*/
    predict(observations) {
        console.log(' ............. Predict calling ............. ')
        /*      observations 
           [
                  ['horsepower', 'displacement', 'weight'],
                  ['horsepower', 'displacement', 'weight'],
                  ['horsepower', 'displacement', 'weight']
           ]  
        */
        const predict = this.processFeatures(observations)
            .matMul(this.weights)
            .softmax()
            .argMax(1) // largest value position on the horizontal 
        // return predict.arraySync()
        return predict
    }

    /* ------------------ Test data ------------------ */
    test(testFeatures, testLabels) {
        console.log(' ............. Test calling ............. ')
        /* step 1: Predictions = Probabilities of being the '1' label */
        const predictions = this.predict(testFeatures)
        // console.log(' ***********************************  : ',);
        // console.log(' Test Predictions "b+m1x1+m2x2"  : ',);
        // predictions.print();

        /* step 2: Subtract Real labels from Our Predictions*/
        testLabels = tf.tensor(testLabels).argMax(1) // largest value position on the horizontal
        const incorrect = predictions
            .notEqual(testLabels)
            .sum()  // total
            .dataSync() // only single value not tensor

        /* step 3: Percentage of all Guesess correct 
          (No of Predictions we made - incorrect) / No of Predictions we made  */
        const correctPer = (predictions.shape[0] - incorrect[0]) / predictions.shape[0]
        return correctPer
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
        const filler = variance.cast('bool').logicalNot().cast('float32')
        this.mean = mean;
        this.variance = variance.add(filler);
        return features.sub(mean).div(this.variance.pow(0.5))
    }

    /* --------------------- : Learning Rate Optimisation :------------------------------  */
    /* ---------------------- Helper() : Record COST values-----------------------------  */
    /*
   Cross Entropy =   -(1/n)*(Actual*T.log(Guesses)+(1-Actual)*Tlog(1-Gueses))
    */
    recordCost() {
        const cost = tf.tidy(() => {
            const guesses = this.features.matMul(this.weights).sigmoid()
            const termOne = this.labels.transpose().matMul(guesses.add(1e-7).log())
            const termTwo = this.labels
                .mul(-1)
                .add(1)
                .transpose()
                .matMul(
                    guesses
                        .mul(-1)
                        .add(1)
                        .add(1e-7)  //  1 * 10^ -7 = 0.00000001  => add a constant to avoid log(0) 
                        .log()
                )

            return termOne
                .add(termTwo)
                .div(this.features.shape[0])
                .mul(-1)
                .dataSync() // only single value not tensor

        })
        // console.log(' cost : ', cost[0])
        this.costHistory.unshift(cost[0]) // latest entry on to top
    };

    /* --------------------- Helper() : Update Learning Rate ------------------------------  */
    updateLearningRate() {
        /* history must have more than 2  values */
        if (this.costHistory.length < 2) {
            return;
        }
        /* MSE went up  = bad update  then devide by 2*/
        if (this.costHistory[0] > this.costHistory[1]) {
            this.options.learningRate /= 2;
        }
        /* MSE went down : it is right direction  then multiply with 5% */
        else {
            this.options.learningRate *= 1.05
        }
    }




} // end of class

module.exports = LogisticRegression;

