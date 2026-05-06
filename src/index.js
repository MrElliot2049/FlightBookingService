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

    app.listen(PORT, () => {
        console.log(`Server started listening on ${PORT}`);

        if (process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
    })
}

startServer();