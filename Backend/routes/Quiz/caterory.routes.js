const controller = require("../../controllers/Quiz/categorie.controller");

module.exports = function( app ){

    app.post("/cat/add", controller.createCategory);
    app.post("/cat/update", controller.updateCategory);
    app.post("/cat/delete", controller.removeCategory);
    app.post("/cat/getall", controller.getAllCategories);

}