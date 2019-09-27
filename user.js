const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// hashes the password
schema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

schema.statics.authenticate=async (email, password)=>{
  const user=await mongoose.model("User").findOne({email:email});
  if(user){
    const match=await bcrypt.compare(password,user.password);
    return match ? user:null;
  }
  return null;
}

module.exports = mongoose.model("User", schema);