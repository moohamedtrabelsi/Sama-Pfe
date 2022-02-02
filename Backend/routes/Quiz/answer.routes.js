const controller = require("../../controllers/Quiz/answer.controller");

module.exports = function( app ){

    app.post("/answer/add", controller.createAnswer);
   /* app.post("/cat/update", controller.updateCategory);
    app.post("/cat/delete", controller.removeCategory);
    app.post("/cat/getall", controller.getAllCategories);
    */

}