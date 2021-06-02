const tf = require('@tensorflow/tfjs');
const numeral = require('numeral');
/*
Algorithm = K-Nearest Neighbor (knn)
            "Birds of a feather flock together"
Why  = Looking other observations very close in nature features output
                            
                                Implementation :

        1. Feature Standarization      =  (value-average)/sqrt(variance)
        2. Find the distance between features and prediction point   = sqrt ((lat-lat)**2+(long-long)**2)
        3. Sort from lowestpoint to greatest
        4. Take the top K records
        5. Average the label value of those top K records
*/


class KNN {
    /* --------------------- initial class ------------------------------  */
    constructor(features, labels, k) {
        // convert into tensor because it is array
        this.features = tf.tensor(features);
        this.labels = tf.tensor(labels);
        this.k = k
    }


    knn(features, labels, predictionPoint, k) {
        // 1.Feature Standarization
        const { mean, variance } = tf.moments(features, 0); // along axis 0
        const scaledPrediction = predictionPoint.sub(mean).div(variance.pow(0.5))

        return features
            // 1.standarization
            .sub(mean)
            .div(variance.pow(0.5))
            // 2.distance between features and prediction point 
            .sub(scaledPrediction)
            .pow(2)
            .sum(1)
            .pow(0.5)
            .expandDims(1)
            .concat(labels, 1)
            .unstack()
            // 3.sort lowest to greatest
            .sort((a, b) => a.dataSync()[0] > b.dataSync()[0] ? 1 : -1)
            // 4.take top K records
            .slice(0, k)
            // 5.average the label value of those top K records
            .reduce((acc, pair) => acc + pair.dataSync()[1], 0) / k;

    }

    /* -------------- Training and Test Analysis  --------------*/
    test(testFeatures, testLabels) {

        /*
        accuracy  =   Expected Value - Predicted Value
                     --------------------------------
                           Expected Value
        */


        // console.log(' ............. Test calling signle location trained............. ')
        // const result = this.knn(this.features, this.labels, tf.tensor(testFeatures[0]), this.k);
        // const accuracy =  100*(testLabels[0][0] - result) / testLabels[0][0]
        // console.log('testFeatures :')
        // tf.tensor(testFeatures[0]).print()
        // console.log('Expected Price :', testLabels[0][0])
        // console.log('Predicted Price :', result)
        // console.log('Accuracy is : ', numeral(accuracy).format('0,0.00'), '%')
        // console.log('-----------------------------------------',)

        console.log(' ............. Test calling all location trained............. ')
        testFeatures.forEach((testPoint, i) => {
            const result = this.knn(this.features, this.labels, tf.tensor(testPoint), this.k);
            const accuracy = 100*(testLabels[i][0] - result) / testLabels[i][0]
            console.log('testPoint:', testPoint)
            console.log('Expected Price :', testLabels[i][0])
            console.log('Predicted Price :', result)
            console.log('Accuracy is : ', numeral(accuracy).format('0,0.00'), '%')
            console.log('-----------------------------------------',)
        })

    }

    /* ------------------ predict data ------------------*/
    predict(predictionPoint) {
        console.log(' ............. Predict calling ............. ')
        console.log('PredictionPoint :', predictionPoint)
        const result = this.knn(this.features, this.labels, tf.tensor(predictionPoint), this.k);
        return 'R ' + numeral(result).format('0,0.00')
    }









} // end of class

module.exports = KNN;


