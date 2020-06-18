var  user = require("./../Model/users-model");

module.exports.getalluser = async function (req , res){
    try{
        result = await user.find();
        res.status(200).json(
            result
        )
    }
    catch (err) {
        res.status(401).send(err);
      }
}
