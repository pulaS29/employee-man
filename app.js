/* require variables */
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    cookieParser    = require("cookie-parser"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    Category        = require("./models/category"),
    Employee        = require("./models/employee"),
    User            = require("./models/user"),
    session         = require("express-session"),
    methodOverride  = require("method-override");
    
    
//requiring routes
var indexRoutes     = require("./routes/index"),
    categoryRoutes  = require("./routes/category"),
    employeeRoutes  = require("./routes/employee");

/* setup main vars */
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

// Configure passport
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/", indexRoutes);
app.use("/category", categoryRoutes);
app.use("/employee", employeeRoutes);

//=====================================
//Listen to port
//=====================================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The WOO Manager App Server Has Started!");
});