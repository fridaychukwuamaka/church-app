var express = require("express")
mongoose= require("mongoose"),
flash= require("connect-flash"),
bodyParser=require("body-parser"),
methodOverride= require("method-override"),
expressSanitizer= require("express-sanitizer"),
passport=require("passport"),
LocalStrategy=require("passport-local"),
passportLocalMongoose=require("passport-local-mongoose"),
Sermon= require("./models/sermon"),
Announcement= require("./models/announcement"),
upload = require("express-fileupload");


// Init App
var app = express();

// View Engine
mongoose.connect("mongodb://localhost/church")
 app.use(express.static(__dirname + '/public')); 
 app.set("view engine", "ejs");
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(expressSanitizer());
 app.use(methodOverride("_method"));

app.get("/", function(req, res){
    res.render("index")
})

app.get("/announcement", function(req, res){
    Announcement.find({}, function(err, found){
        if(err){
            console.log(err)
        }else{
            res.render("announcement",{found:found})
        }
    })

})

app.get("/sermon", function(req, res){
    Sermon.find({}, function(err, found){
        if(err){
            console.log(err)
        }else{
            res.render("sermon",{found:found})
        }
    })

})

app.get("/new", function(req, res){

    res.render("new")
})


app.post("/announcement", function(req, res){
    var  name= req.body.name;
    var  description= req.body.description;
    var  image= req.body.image;
    var event= req.body.optradio;
  
  var name={
      name:name,
      description: description,
      image:image,
      type: event
  }
  Announcement.create(name, function(err, created){
if(err){
  console.log(err)
}else{
res.redirect("/announcement")
}
  })
})

app.post("/sermon", function(req, res){
    var  name= req.body.name;
    var  body= req.body.body;
    var  audio= req.body.audio;

  
  var name={
      name:name,
      body: body,
      audio:audio,
  }
  Sermon.create(name, function(err, created){
if(err){
  console.log(err)
}else{
res.redirect("/sermon")
}
  })
})

app.get("/announcement/:id", function(req, res){
    var show = req.params.id;
    Announcement.findById(show, function(err, found){
        if(err){
            console.log(err)
        }else{
            res.render("show", {found:found})
        }
    })
})

app.post("/upload", function(req,res){
    if(req.files){
        console.log(req.files)
    }
})

app.get("/sermon/:id", function(req, res){
    var show = req.params.id;
    Sermon.findById(show, function(err, found){
        if(err){
            console.log(err)
        }else{
            res.render("shows", {found:found})
        }
    })
})

//update
app.put("/announcement/:id", function (req, res) {
    Announcement.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){

            console.log(err)
        }else{

            res.redirect("/announcement/"+req.params.id);
        }
    })
}); 

//destroy route
app.delete("/announcement/:id", function (req, res) {
Announcement.findByIdAndDelete(req.params.id,  function(err, updatedBlog){
    if(err){
      
console.log(err)
    }else{

        res.redirect("/announcement");
    }
})
}); 


//update
app.put("/sermon/:id", function (req, res) {
    Sermon.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){

            console.log(err)
        }else{

            res.redirect("/sermon/"+req.params.id);
        }
    })
}); 

//destroy route
app.delete("/sermon/:id", function (req, res) {
Sermon.findByIdAndDelete(req.params.id,  function(err, updatedBlog){
    if(err){
      
console.log(err)
    }else{

        res.redirect("/sermon");
    }
})
}); 


app.listen("3000", function(){
	console.log('Server started ');
});