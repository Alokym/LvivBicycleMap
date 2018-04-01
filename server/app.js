'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');

require('./databases/mongo.db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

const pointsRoute = require('./routes/points.route');
const categoriesRoute = require('./routes/categories.route');
const feedbackRoute = require('./routes/feedback.route');

app.use('/api', pointsRoute);
app.use('/api', categoriesRoute);
app.use('/api', feedbackRoute);

app.use(history(
    {
        verbose: true
    }
));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
