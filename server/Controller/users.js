var user = require("./../Model/users-model");

module.exports.getalluser = async function (req, res) {
    try {
        if (req.user.email === "paprejadivyaansh@gmail.com") {
            result = await user.find();
            res.status(200).json(
                result
            )
        }
        else {
            res.status(200).send("You Doesn't Have The Admin Rights !")
        }
    }
    catch (err) {
        res.status(401).send(err);
    }
}

module.exports.getuser = async function (req, res) {
    try {
        var id = req.params.id;
        var result = await user.findById(id);

        res.status(200).json({
            ans: result
        });
    }
    catch (err) {
        res.status(401).send(err);
    }
};

module.exports.updateuser = async function (req, res) {
    try {
        // console.log(req);
        var id = req.body["_id"] || req.params.id;
        // console.log(req.body);
        var result = await user.findByIdAndUpdate(id, req.body, { new: true });
        // console.log(result);

        res.status(200).json({
            status: "Update is succesful",
            result: result
        });
    }
    catch (err) {
        res.status(401).send(err);
    }
};


// module.exports.postuser = async function (req, res) {
//     try {
//         console.log(req.body);
//         await user.create(req.body);
//         res.status(200).send("DONE");
//     }
//     catch (err) {
//         res.status(401).send(err);
//     };
// };


