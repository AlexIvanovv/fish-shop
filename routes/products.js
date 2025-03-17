import express from "express";
import authService from "../services/authService.js"

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /product.
const router = express.Router();

//@route GET to api/products
//@description get all products
//@access Public
router.get("/", async (req, res) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        const collection = await db.collection("products");
        const results = await collection.find(query).toArray();
        res.send(results).status(200);
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
});

//@route GET to api/products/:id
//@description get single product by id
//@access Public
router.get("/:id", async (req, res) => {
    try {
        const collection = await db.collection("products");
        const query = {_id: new ObjectId(req.params.id)};
        const result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
});

//@route POST to api/products
//@description add item to products
//@access Private
router.post("/", authService.verifyToken, async (req, res) => {
    const admin = req.decoded.user.role
    if (admin !== "admin") {
        return res.status(401).json({
            success: false,
            message: "Вие не сте оторизиран да изпълните тази операция."
        })
    }
    try {
        const newDocument = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            sku: req.body.sku,
        };
        const collection = await db.collection("products");
        const result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error adding new product");
    }
});

//@route PATCH to api/products
//@description update product by its id
//@access Private
router.patch("/:id", authService.verifyToken, async (req, res) => {
    const admin = req.decoded.user.role
    if (admin !== "admin") {
        return res.status(401).json({
            success: false,
            message: "Вие не сте оторизиран да изпълните тази операция."
        })
    }
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                category: req.body.category,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                price: req.body.price,
                sku: req.body.sku,
            },
        };

        const collection = await db.collection("products");
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
});

//@route DELETE to api/products
//@description delete product by its id
//@access Private
router.delete("/:id", authService.verifyToken, async (req, res) => {
    const admin = req.decoded.user.role
    if (admin !== "admin") {
        return res.status(401).json({
            success: false,
            message: "Вие не сте оторизиран да изпълните тази операция."
        })
    }
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("products");
        const result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
});

export default router;