if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
  // console.log("env", process.env)
}

const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const logger = require('morgan');
const cacheControl = require('express-cache-controller');
const session = require('express-session');

const apiRouter = require('./routes/api')
const apiSlackRouter = require('./routes/slack/index')

const app = express();
app.use(cors({
  // origin: 'http://localhost:3000',
  origin: '*',
  credentials: true, // 'Access-Control-Allow-Credentials'
  // optionsSuccessStatus: 200
}))
app.use(cacheControl({ maxAge: 14400 }));
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly: false,
    secure: false,
    maxage: 1000 * 60 * 30
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/api/slack', apiSlackRouter)

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
  res.json(err)

});

module.exports = app;
