var mobile = require("./../Model/mobiles-model");
var user = require("./../Model/users-model")
module.exports.getallmobile = async function (req, res) {
  try {
    result = await mobile.find();
    res.status(200).json(
      result
    )
  }
  catch (err) {
    res.status(401).send(err);
  }
}

module.exports.getmobile = async function (req, res) {

  try {
    var id = req.params.id;
    var result = await mobile.findById(id);

    res.status(200).json({
      ans: result
    });
  }

  catch (err) {
    res.status(401).send(err);
  }
};

module.exports.postmobile = async function (req, res) {
  try {
    // console.log(req.body);
    // console.log(req.user);
    if (req.user.email === "paprejadivyaansh@gmail.com") {
      await mobile.create(req.body);
      res.status(200).send("Given Mobile Model is Listed");
    }
    else {
      res.status(200).send("You Doesn't Have The Admin Rights !")
    }

  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports.updatemobile = async function (req, res) {
  try {
    if (req.user.email === "paprejadivyaansh@gmail.com") {
      var id = req.body["_id"] || req.params.id;
      var result = await mobile.findById(id);
      var updatep = await mobile.updateOne(result, req.body);
      res.status(200).send("You have updated the details");
    }
    else {
      res.status(200).send("You Doesn't Have The Admin Rights !")
    }

  }
  catch (err) {
    res.status(401).send(err);
  }
};

module.exports.buyMobile = async function (req, res) {
  try {
    let user_details = req.user;
    // console.log(req);
    let product_id = req.params.id;
    let mobile_details = await mobile.findById(product_id);
    let old_order = user_details.yourOrders;
    // console.log(old_order);
    old_order.push(mobile_details);
    let order_details = {
      "yourOrders": old_order
    }
    // console.log(order_details);
    var result = await user.findByIdAndUpdate(user_details._id, order_details, { new: true });
    res.status(200).json({
      status: "Your Order is Placed Successfully"
    });
  }
  catch (err) {
    res.status(401).send(err);
  }
}

module.exports.wishlistMobile = async function (req, res) {
  try {
    let user_details = req.user;
    // console.log(req);
    let product_id = req.params.id;
    let mobile_details = await mobile.findById(product_id);
    let old_order = user_details.yourWishlist;
    // console.log(old_order);
    old_order.push(mobile_details);
    let order_details = {
      "yourWishlist": old_order
    }
    // console.log(order_details);
    var result = await user.findByIdAndUpdate(user_details._id, order_details, { new: true });
    res.status(200).json({
      status: "The Product is Successfullt Added to your Wishlist"
    });
  }
  catch (err) {
    res.status(401).send(err);
  }
}

module.exports.deleteMobile = async function (req, res) {
  try {
    if (req.user.email === "paprejadivyaansh@gmail.com") {
      var id = req.body["_id"] || req.params.id;
      var result = await mobile.findByIdAndDelete(id);

      if (result) {
        res.status(200).send(result.company + result.modelNo + " is Deleted From Database");
      }
    }
  }
  catch (err) {
    res.status(401).send(err);
  }
}
