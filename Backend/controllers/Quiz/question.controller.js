const Answer = require("../../models/Quiz/answer.model");
const Question = require("../../models/Quiz/question.model");

exports.createQuestion = async (req, res) => {
    const rq = await req.body;
    const question = new Question({
        txt: rq.txt,
    })
    question.save((err, cat) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(201).send({ message: "question was registered successfully!" });
    })
}

exports.deleteQuestion = (req, res) => {

    Question.findOne({
        _id: req.body._id
    }).populate("answers","-__v")
    .exec((err, qst) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } qst.answers.forEach(element => {
            console.log(element.txt);
            Answer.deleteOne(element) .exec((err) => {
                if (err) {
                  res.status(400).send("error");
                }
               
              }
            
              );;
        });
        Question.deleteOne(qst)
        .exec((err) => {
            if (err) {
              res.status(400).send("error");
            }
            res.status(200).send("question deleted");
          }
        
          );
    });
}
