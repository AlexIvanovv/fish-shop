import jwt from 'jsonwebtoken'
import keys from '../config/keys.js'

export default class AuthService {
    constructor() {}

    // Verify Token validity and attach token data as request attribute
    static verifyToken = (req, res, next) => {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        const token = bearerHeader ? bearerHeader.split(' ')[1] : null;

        if (token) {
            jwt.verify(token, keys.secretOrKey, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Authentication failed."
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(403).json({
                success: false,
                message: 'Authentication failed.'
            })
        }
    };
}