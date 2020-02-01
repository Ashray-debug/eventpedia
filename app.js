const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const LocalStratergy = require("passport-local")
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const flash  = require("connect-flash")
app.set("view engine","ejs")

// mongoose.connect("mongodb+srv://admin-ashray:test123@ashray-8z4xs.mongodb.net/HeckProject" ,  { useUnifiedTopology: true,useNewUrlParser : true })
const db = mongoose.connect("mongodb://localhost:27017/HeckProject" ,  { useUnifiedTopology: true,useNewUrlParser : true })
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// models =============================
userSchema = require("./models/Schemas/userSchema")
User = mongoose.model("User",userSchema)
heckSchema = require("./models/Schemas/heckSchema")
Heck = mongoose.model("Heck",heckSchema)
// routes  ============================
const addPosterToEvent = require("./models/HeckData/addPosterToEvent")
const createEvent = require("./models/HeckData/createEvent")
const loggedInRoute = require("./models/Index/loggedInRoute")
const deleteEvent = require("./models/HeckData/deleteEvent")
const addPhotoToUser = require("./models/editData/addPhotoToUser")
const editUserData = require("./models/editData/editUserData")
const createUser = require("./models/Index/signup")
const starHeck = require("./models/HeckData/starHeck")
const unstarHeck = require("./models/HeckData/unstarHeck")
const showAllHecks = require("./models/ShowHecks/showAllHecks")
const showTechnicalEvents = require("./models/ShowHecks/showTechnicalEvents")
const showCulturalEvents = require("./models/ShowHecks/showCulturalEvents")
const showSportsEvents = require("./models/ShowHecks/showSportsEvents")
const showOpenMicEvents = require("./models/ShowHecks/showOpenMicEvents")
const showOtherHecks = require("./models/ShowHecks/showotherHecks")
const homeRoute = require("./models/Index/HomeRoute")
const showAllSocieties = require("./models/ShowHecks/showAllSocieties")
const registerToEvent = require("./models/HeckData/registerToEvent")
const showRegisteredEvents = require('./models/ShowHecks/showRegisteredEvents')
const showStarredEvents = require("./models/ShowHecks/showStarredEvents")
const showPostedEvents = require("./models/ShowHecks/showPostedEvents")

var categorySchema = require("./models/Schemas/categorySchema")
var Category = mongoose.model("Category",categorySchema) 

app.use(flash());
app.use(methodOverride("_method"));
app.use(require('express-session')({
    resave : false,saveUninitialized : false,secret : "Hack Project"
}))
app.use(function(req,res,next){
    res.locals.user = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
})

//2 things of passport initialising and passport session
app.use(passport.initialize())
app.use(passport.session())

//3 things of passport
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use( express.static( "public" ) )

app.use(bodyParser.urlencoded({extended : true}))

app.get("/login",function(req,res){
    res.render("login",{showMessage : false,showError : false})
})

app.get("/",homeRoute)

app.get("/showHeck/:id",(req,res)=>{
    Heck.findById(req.params.id,(err,foundHeck)=>{
        if(err){
            res.send(err)
        }else{
            res.render("oneHeck",{ heck : foundHeck })
        }
    })
})

app.post('/createUser',createUser)

app.post("/login",passport.authenticate("local",{  //middleware
    successRedirect: "/loggedIn",   //it will take the data from the form and if it matches with any user in database then will be redirected to secret
    failureRedirect : "/notMatched"    //else will be redirected to login
}),function(req,res){
})

app.get("/loggedIn", isLoggedIn,loggedInRoute)

app.get("/notMatched",(req,res)=>{
    req.flash("error","Credentials are wrong")
    res.redirect("/")
})

app.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("/")
})

app.get("/addEvent",isLoggedIn,(req,res)=>{
    res.render("createEvent",{user : req.user})
})

app.post("/addEvent",isLoggedIn,createEvent)

app.get('/aboutus',(req,res)=>{
    res.render("aboutus",{ user : req.user })
})

app.get('/deleteHeck/:heckId/of/:ownerId',isLoggedIn,deleteEvent)

app.post('/uploadInfo/:id',isLoggedIn,editUserData)

app.post('/uploadPhoto/:id',addPhotoToUser)

app.get("/addPoster/To/:eventId",isLoggedIn,(req,res)=>{
    res.render("addPoster",{user : req.user,eventId : req.params.eventId})
})

app.post("/addPoster/To/:eventId",isLoggedIn,addPosterToEvent)

app.get("/starHeck/:heckId/by/:userId",isLoggedIn,starHeck)
app.get("/unstarHeck/:heckId/by/:userId",isLoggedIn,unstarHeck)

app.get("/allHecks",showAllHecks)
app.get("/technicalEvents",showTechnicalEvents)
app.get("/culturalEvents",showCulturalEvents)
app.get("/sportsEvents",showSportsEvents)
app.get("/openMicEvents",showOpenMicEvents)
app.get("/otherHecks",showOtherHecks)
app.get("/showAllSocieties",showAllSocieties)

app.get("/register/:username/:userId/toEvent/:eventId",isLoggedIn,registerToEvent)

app.get("/registeredEventsOf-:userId",isLoggedIn,showRegisteredEvents)
app.get("/starredEventsOf-:userId",isLoggedIn,showStarredEvents)
app.get("/eventsPostedBy-:userId",isLoggedIn,showPostedEvents)

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Signin To Continue")
    res.redirect("/")
}


app.listen(3000,()=>{
    console.log("server at 3000") 
})