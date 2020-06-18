var mobile = require("./../Model/mobiles-model");

module.exports.getallmobile = async function (req , res){
    try{
        result = await mobile.find();
        res.status(200).json(
            result
        )
    }
    catch (err) {
        res.status(401).send(err);
      }
}

module.exports.postmobile = async function (req, res) {
  try {
    // console.log(req.body);
    await mobile.create(req.body);
    res.status(200).send("Given Mobile Model is Listed");
  } catch (err) {
    res.status(401).send(err);
  }
};
