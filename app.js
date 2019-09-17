const express = require('express');
const mongoose = require('mongoose');
const app = express();

var schema = mongoose.Schema({
    name: {type: String, default: 'Anónimo'},
    count: {type: Number, default: 1},
});

var visitante = mongoose.model('Visitor', schema);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('error', (e)=>{console.error(e)});


app.get('/', (req, res) => {
    nombre = (req.query.name?req.query.name:"Anónimo");
    visitante.find({ name: nombre },function(err, docs) {
        if(docs.length>0){
            visitante.updateOne({ _id: docs[0]._id }, { $set: { count: docs[0].count+1 }},function(){
                visitante.find({},function(err, docs) {
                    let cadena="<table><thead><tr><th>ID</th><th>Name</th><th>Visits</th></tr></thead><tbody>";
                    docs.forEach(element => {
                        cadena+="<tr><td>"+element._id+"</td><td>"+element.name+"</td><td>"+element.count+"</td></tr>"
                    });
                    cadena+="</tbody></table>";
                    res.send(cadena);
                });
            });
            return;
        }else{
            
            visitante.create({name: nombre},function(err){
                if(err) return console.log(err);
                visitante.find({},function(err, docs) {
                    let cadena="<table><thead><tr><th>ID</th><th>Name</th><th>Visits</th></tr></thead><tbody>";
                    console.log(docs);
                    docs.forEach(element => {
                        cadena+="<tr><td>"+element._id+"</td><td>"+element.name+"</td><td>"+element.count+"</td></tr>"
                    });
                    cadena+="</tbody></table>";
                    res.send(cadena);
                });
            });
            
        }
    });

    

    

    

});

app.listen(3000, () => console.log('Listening on port 3000!'));