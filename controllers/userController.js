import User from "../models/user.js";
import bcrypt from "bcrypt";
import { creatToken,verifyToken } from "../utils/jwt.js";


export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !role || !password) {
      return res
        .status(400)
        .json({ message: "name ,email, password , role are  required" });
    }

    //check if email is already exist
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      email,
      password:hash,
      role,
    });
    //save in database
    await newUser.save();

    //create a jwt token for the new usser
    const token = creatToken(newUser);
    //decoded the token
    const decoded = verifyToken(token);
    //set the token in a cookie and send a response
    res
      .status(200)
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .json({ message: "User created successfully", token: decoded });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please fill in your email" });
    }

    if (!password) {
      return res.status(400).json({ message: "Please fill in your password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const token = creatToken(user);
    const decoded = verifyToken(token); // تأكد من صحة اسم الدالة

    res
      .cookie("userToken", token, {
        secure: true, // انتبه إذا تعمل محليًا بدون HTTPS
        httpOnly: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "User logged in successfully", token: decoded });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};


//delete user
export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await User.deleteOne({ _id: id });

  
    res.status(200).json({ message: "User and associated posts deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};







// export const createUser = async(req,res)=>{
// try{
//     const {name,email,password,}=req.body;
//     const newUser = new User({
//         name,
//         email,
//         password
//     })
//     await newUser.save()
//     res.status(201).json(newUser)
//     console.log(newUser)
// }
// catch(error){
//     console.error(error);
//     res.status(500).json({message:"Failed to create a new user"})
// }
// }
