const express=require("express");
const router=express.Router();
const User=require("./../models/User");

//✅CREATE: Register new user
router.post("/register1",async (req,res)=>{
    try{
        const {name,email,password,age,mobile,address,country } =req.body;
        const newUser=await User.create({name,email,password,age,mobile,address,country});
        res.json(newUser);
    }

    catch(error){
        res.status(500).json({error:"Error Creating User"});
    }
});


//✅READ: Get all users

router.get("/users",async(req,res) =>{
    try{
        const users =await User.find({age:10}); //only age 10
        res.json(users);
    }

    catch(error){
        res.status(500).json({error:"Error getting user"});
    }
});

//get users with dynamic age filter

router.get("/users2",async(req,res)=>{
    try{
        const{age}=req.query;

        //Build filter object
        const filter={};
        if(age){
            filter.age=Number(age);  //convert string to number
        }

        const users=await User.find(filter);
        res.json(users);
    }

    catch(error){
        res.status(500).json({error:"error fetching users"});
    }
});

//✅PUT:update

router.put("/users/:id",async(req,res)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(
            req.params.id,
            req.body,  //data to update
            {new:true} //return updated document
        );
           res.json(updatedUser);
    }
    catch(error){
        res.status(500).json({error:"error updating user"});
    }
});

// ✅ DELETE: Delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});





module.exports=router;