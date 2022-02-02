const controller = require("../../controllers/Candidacy/offer.controller");

module.exports = function( app ){

    app.post("/offer/create", controller.createOffer);
    app.post("/offer/delete", controller.removeOffer);
    app.post("/offer/update", controller.updateOffer);
    app.post("/offer/apply", controller.apply);
    app.post("/offer/discard", controller.discard);
    app.get("/offer/myoffers", controller.getAppliedOffers);
    app.get("/offer/alloffers", controller.getAllOffers);



}