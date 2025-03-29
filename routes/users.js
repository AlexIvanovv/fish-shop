import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import keys from "../config/keys.js";
import authService from "../services/authService.js"

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const router = express.Router();

//@route POST to api/users/register
//@description register users route
//@access Public
router.post('/register', async (req, res) => {
    try {
        const users = await db.collection('users');
        const existingUser = await users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Вие вече сте регистриран. Моля използвайте бутона Вход.'})
        } else {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                orders: req.body.orders,
                role: req.body.role,
            };

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    users.insertOne(newUser).then(result => {

                        //sign the token
                        jwt.sign(
                            {user: newUser},
                            keys.secretOrKey,
                            {expiresIn: 86400000},
                            (err, token) => {
                                res.json({success: true, token,
                                    user: {
                                        email: newUser.email,
                                        name: newUser.name,
                                        role: newUser.role,
                                        id: result.insertedId.valueOf(),
                                    }
                                });
                            })
                    })
                })
            })
        }
    } catch(err){
        return res.status(400).json({success: false, message: 'Възникна грешка при регистрацията Ви, моля опитайте отново.'})
    }
})

//@route POST to api/users/login
//@description login users and returning JWT token
//@access Public
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const users = await db.collection('users');
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Потребителят не може да бъде намерен"})
        }
        //Check password
        bcrypt.compare(password, existingUser.password)
            .then(isMatch => {
                if(isMatch) {
                    //Sign Token
                    jwt.sign(
                        {user: existingUser},
                        keys.secretOrKey,
                        {expiresIn: 86400000},
                        (err, token) => {
                            res.json({
                                success: true,
                                token,
                                user: {
                                    email: existingUser.email,
                                name: existingUser.name, role: existingUser.role, id: existingUser._id}
                            })
                        })

                } else {
                    return res.status(400).json({success: false,
                        message: "Грешен имейл или парола. Моля опитайте отново."})
                }
            })
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
})

//@route GET to api/users
//@description get user data with JWT token
//@access Private
router.get('/', authService.verifyToken, async (req, res) => {
    const client = req.decoded.user;
    if (client) {
        res.status(200).json({
            id: client._id,
            email: client.email,
            name: client.name,
            role: client.role,
        });
    } else {
        res.status(404).json({})
    }
})

//@route DELETE to api/users/:id
//@description delete a user
//@access Private
router.delete("/:id", authService.verifyToken, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("users");
        const result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Възникна грешка, моля опитайте отново.");
    }
});

export default router;