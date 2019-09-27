const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("./user");
const routes = require('./routes');


mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/registrations", { useNewUrlParser: true,useUnifiedTopology: true });

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.set('trust proxy', 1) // trust first proxy

app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
    secret:"buenasperrito",
    maxAge: 24*60*60*1000
}));

app.use('/', routes);



app.listen(3000, () => console.log("Listening on port 3000 ..."));
