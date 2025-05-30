import User from "../models/User.js"

export const handleRegister = async(req,res) =>{
    const {name, email, password} =  req.body

    try {
        const newUser = new User ({
            name,
            email,
            password
        })
        await newUser.save()
        
        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error"})
    }
}