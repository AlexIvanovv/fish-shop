import express from "express";
import authService from "../services/authService.js"

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /orders.
const router = express.Router();

//@route GET to api/orders
//@description all orders per user
//@access Private
router.get("/", authService.verifyToken, async (req, res) => {
    const client = req.decoded.user._id;
    const query = {user_id: client};
    try {
        const collection = await db.collection("orders");
        const orders = await collection.aggregate([
            {$match: query},
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "sku",
                    as: "itemDetails"
                }
            },
            {$unwind: "$itemDetails"},
            {$sort: {created_at: -1}},
            {
                $group: {
                    _id: "$itemDetails._id",
                    name: {$first: "$itemDetails.title"},
                    quantity: {$sum: "$quantity"},
                    price: {$first: "$itemDetails.price"},
                    total: {$sum: "$total"}
                }
            }
        ]).toArray();

        res.send(orders).status(200);
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
});

// This section will help you get a single order by id
router.get("/:id", async (req, res) => {
    const collection = await db.collection("orders");
    const query = { _id: new ObjectId(req.params.id) };
    try {
        const result = await collection.aggregate([
            {$match: query},
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "sku",
                    as: "itemDetails"
                }
            }]).toArray();

        if (!result.length) res.send("Поръчката не беше открита").status(404);
        else res.send(result[0]).status(200);
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
});

//@route POST to api/orders
//@description create an order
//@access Private
router.post("/", authService.verifyToken, async (req, res) => {
    const client = req.decoded.user._id;
    const items = req.body.items;
    try {
        const newDocuments = items.map((item) => ({
            product_id: item.product,
            quantity: item.quantity,
            user_id: client,
            total: item.quantity * item.price,
            created_at: Date.now(),
        }))
        const collection = await db.collection("orders");
        const result = await collection.insertMany(newDocuments);
        res.send(result).status(204);
    } catch(err) {
        return res.status(400).json({success: false, message: 'Възникна грешка, моля опитайте отново.'})
    }
});

//@route PATCH to api/orders
//@description update an order by order id
//@access Private
router.patch("/:id", authService.verifyToken, async (req, res) => {
    const client = req.decoded.user._id;
    try {
        const query = { _id: new ObjectId(req.params.id),  user_id: client };
        const updates = {
            $set: {
                product_id: req.body.product,
                quantity: req.body.quantity,
                total: req.body.quantity * req.body.price,
                user_id: client
            },
        };

        const collection = await db.collection("orders");
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(400).send("Възникна грешка, моля опитайте отново.");
    }
});

//@route DELETE to api/orders
//@description delete an order by order id
//@access Private
router.delete("/:id", authService.verifyToken, async (req, res) => {
    const client = req.decoded.user._id;
    try {
        const query = { _id: new ObjectId(req.params.id), user_id: client };

        const collection = db.collection("orders");
        const result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(400).send("Възникна грешка, моля опитайте отново.");
    }
});

export default router;