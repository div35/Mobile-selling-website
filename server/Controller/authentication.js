var user = require("./../Model/users-model");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var { send_email } = require("./../Utility/email");
module.exports.loginuser = async (req, res) => {
    try {
        // console.log(req.body);
        if (req.body.email == undefined || req.body.password == undefined) {
            res.status(201).send("ENTER PROPERLY !!!");
        }
        else {
            let result = await user.findOne({ email: req.body.email });
            if (!result) {
                res.status(201).send("Please enter a valid Email Id !!!");
                return;
            }

            let pass = result.password;

            var proof = await bcrypt.compare(req.body.password, pass);
            if (!proof) {
                res.status(201).send("Password is wrong !!!");
                return;
            }

            var token = jwt.sign({ "id": result._id }, "div123", { expiresIn: "10d" });
            res.cookie("jwt", token, { httpOnly: true });

            res.status(200).send({
                "status": "User Logged In",
                // "token": token
            });
        }

    }
    catch (err) {
        res.send(err);
    }
}

module.exports.signupuser = async (req, res) => {
    //   1. check whether emailid and password is entered
    //   2. create user
    //   3. create token using jsonwebtoken
    //   4. response to user

    if (req.body.email == undefined || req.body.password == undefined) {
        res.status(401).send("ENTER PROPERLY !!!");
    }

    try {
        console.log(req.body);
        await user.create(req.body);
        var token = jwt.sign({ "id": newobj._id }, "div123", { expiresIn: "10d" });
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).send("You Signedup Successfully");
    }
    catch (err) {
        res.status(401).send(err);
    };

}

module.exports.logoutuser = async (req, res) => {
    try {
        res.cookie("jwt", "logged out", {
            expires: new Date(Date.now() + 1000),
            httpOnly: true
        })
        res.status(201).json({
            status: "User Logged Out"
        })
    }
    catch (err) {
        res.status(401).send(err);
    }

}

module.exports.protect = async (req, res, next) => {
    try {
        var token;
        // console.log(req.headers.cookie);
        if (req.headers.cookie) {
            token = req.headers.cookie.split("=")[1];
            // console.log(token)
            let decode = jwt.verify(token, "div123");

            if (!decode) {
                return res.end("Pls enter valid details");
            }

            // console.log(decode.id)

            var temp_user = await user.findById(decode.id);
            if (!temp_user) {
                return res.send("User is not signed up");
            }
            req.user = temp_user;
            next();
        }
        else {
            return res.send("User is not signed up");
        }
    }
    catch (err) {
        res.status(401).send(err);
    }
}

module.exports.changepass = async (req, res) => {
    try {
        let result = req.user;
        // console.log(result);

        let pass = result.password;
        var proof = await bcrypt.compare(req.body.oldpass, pass);

        if (!proof) {
            res.status(201).send("Old Password is wrong");
            return;
        }

        result.password = req.body.newpass;
        result.confirm_pass = req.body.confirm_pass;
        var temp = await result.save();
        res.status(201).send("Password changes succesfully");
    } catch (err) {
        res.status(401).send(err);
    }
}

module.exports.forgetpassword = async (req, res) => {
    // 1. get email id from req.body
    var email = req.body.email;
    if (!email) {
        res.end("Please enter the email id");
    }
    // console.log(email);

    // 2. chk emailid existance using findone
    var chk = await user.findOne({ email: email });
    if (!chk) {
        res.end("You are not signed up yet");
    }

    let token = crypto.randomBytes(32).toString("hex");
    // console.log(token);

    await user.findByIdAndUpdate(chk._id, { "reset_token": token }, { new: true });
    // 4. send email to the user having the random token using mailtrap
    try {
        send_email({
            to: chk.email,
            subject: "Token to reset password of Mobile Website",
            text: "Token is : " + token
        });
        res.send("Token was sent successfully to you email address");
    } catch (err) {
        res.status(401).send(err);
    }

}

module.exports.resetpassword = async (req, res) => {
    // 1. get token from user
    // console.log(req.body.token);
    // console.log(req.body.password);
    var person = await user.findOne({ reset_token: req.body.token });
    if (!person) {
        res.end("Token is invalid");
    }
    // console.log(req.headers);
    // console.log(req.body);
    // 2. update password
    var pass = req.body.password;
    // console.log(pass);
    person.password = pass;
    person.reset_token = undefined;
    await person.save({ validatebeforesave: false });
    res.status(201).send("Password changes succesfully");

}