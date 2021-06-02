// Load the binding (CPU computation)
require('@tensorflow/tfjs-node');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const routes = require('../routes/routes');
const hostname = 'localhost' //'127.0.0.1';
const port = 4001;
var knn = require('../knn/index'); // command line testing
var linear = require('../linear-regression/index'); // command line testing
var binaryLogistic = require('../binary-logistic-regression/index'); // command line testing
var multiLogistic = require('../multi-logistic-regression/index'); // command line testing
var multiLogisticImage = require('../multi-logistic-regression-image/index'); // command line testing

// step 1:create an express application.
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(routes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


/* ----------- 1.K-Nearest Neighbor (knn) -----------*/
let observations = [47.561, -122.226, 11019, 3630]
const { accuracy, data } = knn.process(observations);
console.log(`Accuracy = ${accuracy} % `);
console.log(`Predicted House Price  = `, data);

/* ----------- 1.Vectorized Linear Regression -----------*/

// let fileName = 'may'
// let fileName = 'june'
// const { accuracy, data } = linear.process(fileName);
// console.log(`Action = ${fileName} | Accuracy = ${accuracy} % `);
// console.log(`Predictions Array`, data.length); 


/* ----------- 2.Logistic Linear Regression ( Binary Clasification ) ----------- */

// const { accuracy, data } = binaryLogistic.process('cars');


/* ----------- 3.Logistic Linear Regression ( Multinominal Clasification ) ----------- */

// const { accuracy, data } = multiLogistic.process('cars');


/* ----------- 4.Logistic Linear Regression ( Multinominal Clasification ) : Image Recognisation ----------- */

// const { accuracy, data } = multiLogisticImage.process('cars');
