const Offer = require("../../models/Candidacy/offer.model");
const Candidate = require("../../models/Candidacy/candidate.model");


//Create Offer (Manager)
exports.createOffer = async (req, res) => {
    const rq = await req.body;
    const offer = new Offer({
        name: rq.name,
        participants: []
    })
    offer.save((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(201).send({ message: "Offer is created successfully!" });
    })
}
//Update Offer (Manager)
exports.updateOffer = async (req, res) => {
    try {
        const rq = req.body;
        const filter = { _id: rq._id };
        const update = { "name": rq.name }

        const updated = await Offer.findOneAndUpdate(filter, update, {
            new: true
        }
        );
        if (!updated) {
            res.status(404).json({ error: 'Offer not Found ! ' })

        }
        res.status(200).send("updated : " + updated.name)
    }
    catch {

        res.status(500).json({ error: 'There was an Error! ' })

    }
}
//Remove Offer (Manager)
exports.removeOffer = async (req, res) => {


    const rq = req.body;
    const filter = { _id: rq._id };

    try {
        await Offer.findOneAndRemove(filter);

        res.status(200).send("deleted successfuly");

    }
    catch {
        res.status(500).json({ error: 'There was an Error! ' })

    }
}
//Apply for an Offer (Candidate)
exports.apply = (req, res) => {
    const rq = req.body;
    Candidate.findOne({
        email: req.headers.email
    }).exec((err, can) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!can) {
            res.status(404).send("Candidate not found");
            return;
        }

        Offer.findOne({
            _id: req.body._id
        }).exec((err, ofr) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!ofr) {
                res.status(404).send("Offer not found");
                return;
            }
            if(can.offers.includes(ofr._id))
            {
                res.status(400).send("candidate already applyed");

                return;
            }
            ofr.participants.push(can);
            can.offers.push(ofr);
            ofr.save(err => {
                if (err) {
                    res.status(500).send("Candidate not added to Session");

                    return;
                }

            })
            can.save(err => {
                if (err) {
                    res.status(500).send("Candidate not added to Session");

                    return;
                }

            })

            console.log("Candidate added to Session");

            res.status(200).send(ofr)
        })

    });
}
//Discard Offer (Manager,Candidate)
exports.discard = async (req, res) => {

    const rq = req.body;
    Candidate.findOne({
        email: req.headers.email
    }).exec((err, can) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!can) {
            res.status(404).send("Candidate not found");
            return;
        }


        Offer.findOne({
            _id: req.body._id
        }).exec((err, ofr) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!ofr) {
                res.status(404).send("Offer not found");
                return;
            }

            ofr.participants.remove(can)
            can.offers.remove(ofr)
            ofr.save(err => {
                if (err) {
                    res.status(500).send("error");

                    return;
                }

            })
            can.save(err => {
                if (err) {
                    res.status(500).send("Candidate not added to Session");

                    return;
                }

            })
            console.log("Candidate removed from Offer");

            res.status(200).send(ofr)
        })

    });

}

//Show offers that i applied in
exports.getAppliedOffers = (req,res) =>{
    Candidate.findOne({
        email:req.headers.email
    }).populate("offers","-__v")
    .exec((err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

        res.status(200).send(user.offers);

    });
}

//Show all Offers
exports.getAllOffers = async (req,res) =>{
    try{

        const offers = await Offer.find({});
        res.status(200).send(offers);


    }   
    catch(err){
        res.send(err);
    }
}