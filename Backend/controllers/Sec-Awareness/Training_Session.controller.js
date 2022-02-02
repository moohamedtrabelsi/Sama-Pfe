const Employee = require("../../models/Sec-Awareness/employee.model");
const trainingSession = require("../../models/Sec-Awareness/training-Session.model");

//Create Training Session (Manager)
exports.createTrainingSession = async (req, res) => {
    const tSession = await req.body;
    const ts = new trainingSession({
        name: tSession.name,
        expireDate: tSession.expireDate,
        lessons: [],
        participants: []
    })
    ts.save((err, session) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(201).send({ message: "Session was registered successfully!" });
    })
}

//Update Training Session (Manager)
exports.updateSession = async (req, res) => {
    try {
        const rq = req.body;
        const filter = { _id: rq._id };
        const update = {
            "name": rq.name,
            "expireDate": rq.expireDate
        }

        const updated = await trainingSession.findOneAndUpdate(filter, update, {
            new: true
        }
        );
        if (!updated) {
            res.status(404).json({ error: 'Session not Found ! ' })

        }
        res.status(200).send("updated : " + updated.name)
    }
    catch {

        res.status(500).json({ error: 'There was an Error! ' })

    }
}
//Remove Training Session (Manager)
exports.removeTrainingSession = async (req, res) => {


    const rq = req.body;
    const filter = { _id: rq._id };

    try {
        await trainingSession.findOneAndRemove(filter,);

        res.status(200).send("deleted successfuly");

    }
    catch {
        res.status(500).json({ error: 'There was an Error! ' })

    }
}

//Participate in Training Session (Employee)
exports.participateTs = (req, res) => {
    const rq = req.body;
    Employee.findOne({
        email: req.headers.email
    }).exec((err, emp) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!emp) {
            res.status(404).send("Employee not found");
            return;
        }

        trainingSession.findOne({
            _id: req.body._id
        }).exec((err, ts) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!ts) {
                res.status(404).send("Training Sesion not found");
                return;
            }
            if(emp.tSessions.includes(ts._id))
            {
                res.status(400).send("employee already participated");

                return;
            }
            ts.participants.push(emp)
            emp.tSessions.push(ts)
            ts.save(err => {
                if (err) {
                    res.status(500).send("employee not added to Session");

                    return;
                }

            })

            emp.save(err => {
                if (err) {
                    res.status(500).send("employee not added to Session");

                    return;
                }
            })
            console.log("employee added to Session");

            res.status(200).send(ts)
        })

    });
}

//Remove employee from Training Session (Employee)
exports.removeEmpTs = async (req, res) => {

    const rq = req.body;
    Employee.findOne({
        email: req.headers.email
    }).exec((err, emp) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!emp) {
            res.status(404).send("Employee not found");
            return;
        }


        trainingSession.findOne({
            _id: req.body._id
        }).exec((err, ts) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!ts) {
                res.status(404).send("Training Sesion not found");
                return;
            }
            ts.participants.remove(emp)
            emp.tSessions.remove(ts)
            ts.save(err => {
                if (err) {
                    res.status(500).send("error");

                    return;
                }

            })
            emp.save(err => {
                if (err) {
                    res.status(500).send("employee not added to Session");

                    return;
                }

            })
            console.log("employee removed from Session");

            res.status(200).send(ts)
        })

    });

}

//Show Training Sessions that i participated in (Employee)
exports.getMyTrainingSessions = (req,res) =>{
    Employee.findOne({
        email:req.headers.email
    }).populate("tSessions","-__v")
    .exec((err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        res.status(200).send(user.tSessions);

    });
}

//Show all Training Sessions (Employee)
exports.getAllTrainingSession = async (req,res) =>{
    try{

        const sessions = await trainingSession.find({});
        res.status(200).send(sessions);


    }   
    catch(err){
        res.send(err);
    }
}