const express = require('express');
const {PORT} = require('./config/server-config');
const bodyParser = require('body-parser');
const app = express();
const V1Routes = require('./routes/index');
const db = require('./models/index');


const startServer = async (req,res) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', V1Routes);
    // app.get('/api/v1/home', (req, res) => {
    //     return res.status(200).json({
    //         message:"Booking service se baat krr raha h tu"
    //     })
    // })
    app.listen(PORT, () => {
        console.log(`Server started listening on ${PORT}`);
    })
}

startServer();