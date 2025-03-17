import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import db from '../db/connection.js';
import bcrypt from 'bcryptjs';
import keys from '../config/keys.js';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

const passportService = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const {email, hash} = jwt_payload;

        try {
            const collection = await db.collection("users");
            const users = await collection.find({email}).toArray();

            const isValid = bcrypt.compare(hash, users[0].password);

            if (isValid) {
                return done(null, users[0]);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done("NOT AUTHORIZED", false,
                { message: 'This username is not registered.' })
        }
    }))
}

export default passportService;