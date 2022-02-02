const Category = require("../../models/Quiz/category.model");

exports.createCategory = async (req, res) => {
    const rq = await req.body;
    const category = new Category({
        name: rq.name,
    })
    category.save((err, cat) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(201).send({ message: "Category was registered successfully!" });
    })
}

//Update Category (Manager)
exports.updateCategory = async (req, res) => {
    try {
        const rq = req.body;
        const filter = { _id: rq._id };
        const update = {
            "name": rq.name,
        }

        const updated = await Category.findOneAndUpdate(filter, update, {
            new: true
        }
        );
        if (!updated) {
            res.status(404).json({ error: 'Category not Found ! ' })

        }
        res.status(200).send("updated : " + updated.name)
    }
    catch {
        res.status(500).json({ error: 'There was an Error! ' })

    }
}

//Remove Category (Manager)
exports.removeCategory = async (req, res) => {


    const rq = req.body;
    const filter = { _id: rq._id };

    try {
        await Category.findOneAndRemove(filter,);
        res.status(200).send("deleted successfuly");

    }
    catch {
        res.status(500).json({ error: 'There was an Error! ' })

    }
}

//Show all Categories (Manager)
exports.getAllCategories = async (req,res) =>{
    try{

        const categories = await Category.find({});
        res.status(200).send(categories);

    }   
    catch(err){
        res.send(err);
    }
}