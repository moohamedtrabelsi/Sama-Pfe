const Answer = require("../../models/Quiz/answer.model");
const Question = require("../../models/Quiz/question.model");

exports.createAnswer = async (req, res) => {
    const rq = await req.body;
    const answer = new Answer({
        txt: rq.txt,
        status:rq.status,
    })
    answer.save((err, answr) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Question.findOne({
            _id: req.headers._id
        }).exec((err, qst) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }            qst.answers.push(answr)
            qst.save((err, answr) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

        res.status(201).send({ message: "Answer was registered successfully!" });
        });
    });
    })
}

//Update Answer (Manager)
exports.updateAnswer = async (req, res) => {
    try {
        const rq = req.body;
        const filter = { _id: rq._id };
        const update = {
            "txt": rq.txt,
            "status":rq.status,
        }

        const updated = await Answer.findOneAndUpdate(filter, update, {
            new: true
        }
        );
        if (!updated) {
            res.status(404).json({ error: 'Answer not Found ! ' })

        }
        res.status(200).send("updated : " + updated.txt)
    }
    catch {
        res.status(500).json({ error: 'There was an Error! ' })

    }
}

//Remove Answer (Manager)
exports.removeAnswer = async (req, res) => {


    const rq = req.body;
    const filter = { _id: rq._id };

    try {
        await Answer.findOneAndRemove(filter,);
        res.status(200).send("deleted successfuly");

    }
    catch {
        res.status(500).json({ error: 'There was an Error! ' })

    }
}

