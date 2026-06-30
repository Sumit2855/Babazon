const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn :'30d'});
}

//Register a new user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'user already exists.'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({ name, email, password: hashedPassword });
        if(user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `
            Welcome ${name}!
            Your OTP for Jaimahakaal Ragistration is : ${otp} `;

           // await sendEmail(email, 'Welcome to Jaimahakaal Your OTP for Registration', message);

            res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)

            
            });
        }
        else{
            res.status(400).json({ message: 'Invalid User Data'})
        }

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};




//Login User
const loginUser = async (req, res) => {
    const { email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });          
        } else {
            res.status(400).json({message: 'Invalid email or password'})
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};


//getUser
const getUsers = async(req, res) => {
    try{
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers
};