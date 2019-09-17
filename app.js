const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded());


var schema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var visitante = mongoose.model('Visitor', schema);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('error', (e)=>{console.error(e)});

app.post('/', (req, res) => {
    visitante.create({name: req.body.name,email:req.body.email,password:req.body.password},function(err){
        if(err) return console.log(err);
        visitante.find({},function(err, docs) {
            let cadena='<a href="/register">Registrar</a><table><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>';
            docs.forEach(element => {
                cadena+="<tr><td>"+element.name+"</td><td>"+element.email+"</td></tr>"
            });
            cadena+="</tbody></table>";
            res.send(cadena);
        });
    });
});


app.get('/', (req, res) => {
    visitante.find({},function(err, docs) {
        let cadena='<a href="/register">Registrar</a><table><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>';
        docs.forEach(element => {
            cadena+="<tr><td>"+element.name+"</td><td>"+element.email+"</td></tr>"
        });
        cadena+="</tbody></table>";
        res.send(cadena);
    });
});

app.get('/register', (req, res) => {
    res.send('<form action="//localhost:3000/" method="post"><input type="text" id="name" name="name" placeholder="nombre"><input type="email" id="email" name="email" placeholder="Email"><input type="password" id="password" name="password" placeholder="Password"><input type="submit" value="Enviar"/></form>');
    
    
    /*
    nombre = (req.query.name?req.query.name:"Anónimo");
    visitante.find({ name: nombre },function(err, docs) {
        if(docs.length>0){
            visitante.update({ _id: docs[0]._id }, { $set: { count: docs[0].count+1 }},function(){
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
                
            });
            
        }
    });
    */
});

app.listen(3000, () => console.log('Listening on port 3000!'));