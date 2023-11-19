import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../redis.js";
import dotenv from "dotenv";

dotenv.config()

client.connect()
    .then(() => {
        console.log("Connected to Redis")
    })
    .catch((e) => {
        console.log(e)
    })

export const signup = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body.formData;
        console.log(name, email, password);
        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ msg: "The email already exists." })

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            email: email,
            password: passwordHash
        })
        await newUser.save()
        res.status(200).json({ msg: "Sign up Success" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) return res.status(400).json({ msg: "User does not exist." })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })

        // if login success create token
        const payload = { id: user._id, name: user.name, email: email }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        console.log(token);
        console.log(token);
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        }
        await client.set(`key-${email}`, JSON.stringify(response))
        res.status(200).json({ token })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message })
    }
}

export const verifToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
            if (err) return res.status(400).json({ msg: "Authorization not valid." })
            const user = await User.findById(verified.id)
            if (!user) return res.send(false)
            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const verifyUser = async (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decodedToken);
        if (decodedToken) {
            const email = decodedToken.email;
            const auth = await client.get(`key-${email}`);
            if (auth) {
                const data = JSON.parse(auth);;
                return data
            } else {
                const data = await User.findOne({ email: email });
                return data;
            }
        }
        return false;
    } catch (error) {
        console.log(error)
    }
}