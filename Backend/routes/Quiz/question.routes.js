const controller = require("../../controllers/Quiz/question.controller");

module.exports = function( app ){

    app.post("/question/add", controller.createQuestion);
    app.post("/question/delete", controller.deleteQuestion);
   // app.post("/cat/delete", controller.removeCategory);
   // app.post("/cat/getall", controller.getAllCategories);

}