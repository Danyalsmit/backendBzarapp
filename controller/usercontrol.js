
const jwtSecret = process.env.JWT_SECRET || "key"; // Use a default value if not provided in the environment

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userSchema/userScheme");

async function signupcontroller (req, res) {
    const { name, email, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
  
      // Create a new user with the hashed password
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async  function logincontroller(req, res){
    const { email, password } = req.body;
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
        expiresIn: "1h", // You can adjust the expiration time
      });
  
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }


  module.exports={signupcontroller,logincontroller}