import User from "../models/user.js";

export function createUser(req, res){

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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