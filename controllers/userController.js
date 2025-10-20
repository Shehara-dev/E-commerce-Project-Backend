import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Register new user
export function createUser(req, res) {

    const passwordHash = bcrypt.hashSync(req.body.password, 10)

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        role: req.body.role || 'Customer'
    }

    const user = new User(userData)

    user.save().then(
        () => {
            res.json({
                message: "User created successfully"
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Failed to create user",
                error: error.message
            })
        }
    )
}


// Login user
export function loginUser(req, res) {

    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email: email
    }).then(
        (user) => {
            if (user == null) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                const isPasswordCorrect = bcrypt.compareSync(password, user.password)

                if (isPasswordCorrect) {

                    const token = jwt.sign(
                        {
                            _id: user._id,           
                            email: user.email,
                            name: user.name,
                            role: user.role
                        },
                        process.env.JWT_SECRET
                    )
                    res.json({
                        token: token,
                        message: "Login Successful",
                        user: {
                            _id: user._id,         
                            email: user.email,
                            name: user.name,
                            role: user.role
                        }
                    })
                } else {
                    res.status(401).json({
                        message: "Password is incorrect"
                    })
                }
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Login failed",
                error: error.message
            })
        }
    )
}


// Check user is Admin
export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.role == "Admin") {
        return true;
    } else {
        return false;
    }
}


// Check user is Customer
export function isCustomer(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.role == "Customer") {
        return true;
    } else {
        return false;
    }
}