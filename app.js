const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const bodyParser = require('body-parser');
const sendGrid = require('@sendgrid/mail');
const cors = require('cors');
const sendgridObj = require('./sendgridkey.json');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



app.get('/', (req,res) => {
    res.send('Welcome to My port');
})

app.get('/api', (req, res, next) => {
    res.send('API Status: I\'m awesome')
});


app.post('/api/email', (req, res, next) => {

    console.log(req.body);

    sendGrid.setApiKey(sendgridObj.key);
    const msg = {
        to: 'roshan007191@gmail.com',
        from: 'dodo00119911@gmail.com',
        subject: 'Website Contact',
        text: req.body.message+' from ( '+req.body.email+') '
    }

    sendGrid.send(msg)
        .then(result => {
           // console.log(result)
            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});











const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));