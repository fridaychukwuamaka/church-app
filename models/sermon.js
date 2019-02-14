var mongoose = require("mongoose")

var sermonSchema = new mongoose.Schema({
    name: String,
    body: String,
    audio: String,
    created: {type: Date, default: Date.now},
/*     author:{
        id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
           },
           email:String,
           username:String,
           accType:String

          } */
});



module.exports = mongoose.model("Sermon",sermonSchema);