const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
var linear = require('../linear-regression/index');
var logistic = require('../binary-logistic-regression/index');
const knn = require('../knn/index')

const router = express.Router();
router.use(requireAuth);


/* -------------------- : Prediction : K-Nearest Neighbor (knn)---------------------  */
router.post('/knn', async (req, res) => {
  const { action, observations } = req.body; //_observations = [47.561, -122.226, 11019, 3630]
  console.log('observations :', observations);

  try {
    const { accuracy, data } = knn.process(observations);
    return res.status(200).send({ prediction: { action, data, accuracy } });

  } catch (err) {
    return res.send({ status: 422, message: 'Internal Server Error!' })
  }

});


/* -------------------- : Prediction : Vectorized Linear Regression ---------------------  */
router.post('/predictsales', async (req, res) => {
  const { action, fileName } = req.body;  //action === 1 ? 'maysales' : 'junesales'
  console.log('fileName :', fileName);

  try {
    const { accuracy, data } = linear.process(fileName);
    return res.status(200).send({ prediction: { action, data, accuracy } });

  } catch (err) {
    return res.send({ status: 422, message: 'Internal Server Error!' })
  }

});


/* --------------------- : Prediction : Logistic Regression -------------------- */


module.exports = router;
