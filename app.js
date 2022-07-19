var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongodb = require("mongodb");
const dotenv = require("dotenv")
dotenv.config();

const MongoClient = mongodb.MongoClient;
const client = new MongoClient(process.env.DBURL);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const contactusRouter = require("./routes/contactus");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set the API endpoints
app.post("/login-user", async function(request, response){
  const username = request.body.username;
  const password = request.body.password;

  const feedback = await client.db(process.env.DBNAME).collection("users").findOne({"username": username});

  if(feedback){
    //this user exists
    response.send({
      message: "This user exists",
      data: {},
      code: "valid-user",
      type: "login-user"
    })
  }else{
    //the user does not exist
    response.send({
      message: "This user does not exist",
      data: null,
      code: "invalid-user",
      type: "login-user"
    })
  }




    response.send({
      message: request.body.username
    })

})

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/contact-us", contactusRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
