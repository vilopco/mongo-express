const express = require('express');
const mongoose = require('mongoose');
const app = express();

var schema = mongoose.Schema({
    date: String,
    name: {type: String, default: 'Anónimo'}
});

var visitante = mongoose.model('Visitor', schema);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('error', (e)=>{console.error(e)});


app.get('/', (req, res) => {
    visitante.create({date:Date.now(),name: req.query.name},function(){
        res.send('<h1>El visitante fue almacenado con éxito</h1>');
    })
});

app.listen(3000, () => console.log('Listening on port 3000!'));