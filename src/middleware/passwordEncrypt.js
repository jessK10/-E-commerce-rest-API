const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds for hashing

exports.hashPassword = (req, res, next) => {
    const { password } = req.body; // Extract password from request body

    if (!password) {
        return res.status(400).json({ error: "Password is required!" });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }

        req.hashedPassword = hash; // Store hashed password in request object
        console.log("Hashed Password:", hash);
        next(); // Pass request to the next middleware or route
    });
};
