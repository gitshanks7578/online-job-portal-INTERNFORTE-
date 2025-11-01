import { user } from "../models/user.model.js";

// functions we learnt

// .create({})              takes Object
// .find()                  gives full list
// .findById()              takes mongodb _id STRING FORMAT
// .findByIdAndUpdate()     takes id and two objects 
                                // +one for data
                                // +one for schema_validation and instant updation
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    //when we take and say   !name or !email this means either we'll get an object or UNDEFINED...undefined simply means there was no entry
    if (!name || !email)
      return res
        .status(400)
        .json({ message: "all fields are required", success: false });

    const newUser = await user.create({ name, email });
    return res
      .status(200)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "server error", success: false });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ message: "server error", success: false });
  }
};

export const getSpecificUser = async (req, res) => {
  try {
    const specific_user = await user.findById(req.params.id);
    if (!specific_user)
      return res
        .status(400)
        .json({ message: "user doesnt exist", success: false });

    return res.status(200).json({ success: true, specific_user });
  } catch (error) {
    return res.status(500).json({ message: "server error", success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const update_user = await user.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },

    // new:true ->instant front end response needed if u dont care to show and update silently then dont use it
    //   runvalidators - Mongoose does NOT run schema validators (like required, minlength, enum) on findByIdAndUpdate by default. 

      { new: true, runValidators: true }
    );

    if(!update_user) return res.status(400).json({ message: "user doesnt exist", success: false });
    return res.status(200).json({message:"updated successfully",success:true})

  } catch (error) {
    return res.status(500).json({ message: "server error", success: false });
  }
};


export const deleteUser = async (req,res)=>{
    try {
        const delete_user = await user.findByIdAndDelete(req.params.id)
        if(!delete_user) return res.status(400).json({ message: "user doesnt exist", success: false });


        return res.status(200).json({message:"deleted successfully",success:true})
    } catch (error) {
         return res.status(500).json({ message: "server error", success: false });
    }
}

export const registerUser = async (req,res)=>{
  try {
    const {name,email,password} = req.body

    if(!name || !email || !password) return res.status(400).json({message : "all fields are required",success:false})
    const existingUser = await user.findOne({email})
    if(existingUser) return res.status(400).json({message : "user already exists",success:false})
    
    // const newUser = new user({name,email,password})
    // const savedUser = await newUser.save()
    const newUser = await user.create({name,email,password})
    if(!newUser){
       return res.status(500).json({message : "something went wrong while saving user",success:false})
    }
    else{
      return res.status(200).json({success:true,newUser})
    }

  } catch (error) {
    return res.status(500).json({message : error.message,success:false})
  }
}

