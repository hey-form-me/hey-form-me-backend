var express = require('express');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index.routes');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!process.env.DISABLE_XORIGIN) {
  app.use(function (req, res, next) {
    var allowedOrigins = [];
    var origin = req.headers.origin || '*';
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      // console.log(origin);
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
    }
    next();
  });
}

app.use('/api/v1', indexRouter);

// Error Handler
app.use((req, res, next) => {
  res.status(404).send('API Not Found');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});

module.exports = app;
