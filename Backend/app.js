var express = require('express');
const db = require("./models");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dbConfig = require("./config/db.config");

var app = express();

// view engine setup
//app.set('view engine', 'jade');

var corsOptions = {
  origin: "*"
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use('/', indexRouter);

app.use('/users', usersRouter);

require("./routes/Quiz/caterory.routes")(app);
require("./routes/Quiz/question.routes")(app);
require("./routes/Quiz/answer.routes")(app);


require("./routes/Candidacy/candidate.routes")(app);
require("./routes/Candidacy/offer.routes")(app);


require("./routes/Sec-Awareness/employee.routes")(app);
require("./routes/Sec-Awareness/trainingSession.routes")(app);



// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
  next(createError(404));
});
*/
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

/*
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sama HR-System" });
});
function initial() {
  console.log("Welcome ");

}

module.exports = app;
