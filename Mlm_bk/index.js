const express=require("express");
const app=express();
const port=5000;
const cors=require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Registration=require("./Model/userscheme")
const connectDb=require("./Db")
app.use(express.json());
app.use(cors());


//Registration
app.post("/register",async(req,res)=>{
    try{

        const { username,email,contact, password } = req.body;

        const existingUser = await Registration.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Registration({ username,email,contact, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message:"register failed"});

    }
})





//login
app.post('/Reglogin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await Registration.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({message: 'login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


connectDb();

app.listen(port,()=>{
    console.log("server is listening on port ", port);
});