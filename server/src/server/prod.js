// Load the binding (CPU computation)
require('@tensorflow/tfjs-node')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const routes = require('../routes/routes');
const hostname = 'localhost';
const port = 4001;

// step 1:create an express application.
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(routes);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press Ctrl+C to quit.')
});

