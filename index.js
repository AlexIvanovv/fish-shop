import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import passport from "passport";
import users from "./routes/users.js";
import products from "./routes/products.js";
import orders from "./routes/orders.js";
import passportService from "./services/passport.js";

const app = express()

//Middleware for body and cookie parsers
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);

//Passport middleware
app.use(passport.initialize())
app.use(passport.initialize());

//Passport Services
passportService(passport)

// Serve static assets if in production env
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5100

app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
})