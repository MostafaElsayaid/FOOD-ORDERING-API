
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require('nodemailer');





const registerController = async (req, res) => {

  try {

    const { name, email, password, profileImage } = req.body;
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.status(400).send({
        message: "user already exist",
        success: false,
      })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      profileImage: profileImage,
      otp: otp

    })
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    newUser.token = token;


    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sosta12345sosta@gmail.com",
        pass: "odqeunccedukwicb",
      },
    });

    const mailOptions = {
      form: "Auth client webdev warriors",
      to: req.body.email,
      subject: "Otp for email verfiction",
      text: `your verfiy otp is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return res.status(500).send("Error sending email..");
      }
      res.send({
        message: "Otp sent to email"
      });
    });
    return res.status(201).send({
      message: "Register sucessfully",
      data: {
        user: newUser,
        token,
      },
      success: true,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Register error",
      success: false,
    });
  }

}

const authController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      console.log(user);
      return res.status(200).send({
        message: "Register successfuly",
        data: {
          user,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Auth error`
    })

  }
}
const loginController = async (req, res) => {
  try {
    // console.log(req.body)



    const user = await User.findOne({ email: req.body.email }).select("+password"
    );
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      })
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password)
    const signUser = await User.findOne({ email: req.body.email })

    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: `Invaild password and email`,
      })
    }

    const token = jwt.sign({ id: signUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).send({
      message: "Login Sucessfully",
      data: {
        user: signUser,
        token,
      },
      success: true,
    });


  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Auth error`
    })
  }

}

const verifyOtpController = async (req, res) => {
  try {

    const otp = parseInt(req.body.otp)
    const user = await User.findOne({ email: req.body.email });
    if (user.otp === otp) {

      user.isVerified = true;
      await user.save();
      return res.status(200).send({
        success: true,
        message: `Otp verifiy `
      });
    } else {
      return res.status(200).send({
        success: false,
        message: `Otp not verifiy `
      });
    }
  } catch (error) {
    console.log(error)

    res.status(500).send({
      success: false,
      message: `field to verifiy `
    })
  }
}

const updateUserProfile = async (req,res) =>{
  try {
     const { name, profileImage,street,city,country,zipCode,state ,userId} = req.body;

     const user = await User.findById(userId);
     if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      })
    }
    user.name = name || user.name
    user.profileImage = profileImage || user.profileImage
    user.street = street || user.street
    user.city = city || user.city
    user.country = country || user.country
    user.zipCode = zipCode || user.zipCode
    user.state = state || user.state

    await user.save()
    return res.status(201).send({
      message: "Profile Sucessfully updated",
  
      success: true,
    });

  } catch (error) {
    console.log(error)
    return res.status(200).send({
      success: false,
      message: `user error`,
    })
  }
}

module.exports = {
  registerController,
  loginController,
  authController,
  verifyOtpController,
  updateUserProfile
}
