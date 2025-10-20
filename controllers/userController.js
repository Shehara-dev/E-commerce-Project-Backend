import User from "../models/user.js";
import bcrypt from "bcrypt";


//User register
export function createUser(req, res){

    const passwordHash = bcrypt.hashSync(req.body.password, 10)

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        role: req.body.role
    }
    
    const user = new User(userData)

    user.save().then(
        ()=>{
            res.json({
                message: "User create successfully"
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




// Check if user is Admin
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


// Check if user is Customer
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