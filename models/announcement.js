var mongoose = require("mongoose")

var announcementSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    type: String,
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



module.exports = mongoose.model("Accouncement", announcementSchema);