import { user } from "../models/user.model.js";
import { sendVerificationEmail } from "../utils/mailtrap/emails.js";
// functions we learnt

// .create({})              takes Object
// .find()                  gives full list
// .findById()              takes mongodb _id STRING FORMAT
// .findByIdAndUpdate()     takes id and two objects
// +one for data
// +one for schema_validation and instant updation

// const generateAccessAndRefreshTokens = async (userid) => {
//   let checkuser, accessToken, refreshToken;
//   try {
//     checkuser = await user.findById(userid);
//     if (!checkuser) throw new Error("user not found for token generation");

//     accessToken = checkuser.generateAccessToken();
//     refreshToken = checkuser.generateRefreshToken();
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         message: `token generation didnt even started\n${error.message}`,
//         success: false,
//       });
//   }
//   checkuser.refreshToken = refreshToken;
//   await checkuser.save({ validateBeforeSave: false });
//   return { accessToken, refreshToken };
// };

const generateAccessAndRefreshTokens = async(userid) =>{
  let checkuser,refreshToken,accessToken;
  try {
    checkuser = await user.findById(userid)
    if(!checkuser) throw new Error(500,"token generation failed ,couldnt find user")
    
    refreshToken = checkuser.generateRefreshToken()
    accessToken = checkuser.generateAccessToken()
  } catch (err) {
    throw new Error(500,"tokens couldnt generate in first place")
  }

  checkuser.refreshToken = refreshToken
  await checkuser.save({validateBeforeSave : false})
  return {accessToken,refreshToken}
}


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

    if (!update_user)
      return res
        .status(400)
        .json({ message: "user doesnt exist", success: false });
    return res
      .status(200)
      .json({ message: "updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "server error", success: false });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const delete_user = await user.findByIdAndDelete(req.params.id);
    if (!delete_user)
      return res
        .status(400)
        .json({ message: "user doesnt exist", success: false });

    return res
      .status(200)
      .json({ message: "deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "server error", success: false });
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res
//         .status(400)
//         .json({ message: "all fields are required", success: false });
//     const existingUser = await user.findOne({ email });
//     if (existingUser)
//       return res
//         .status(400)
//         .json({ message: "user already exists", success: false });

//     // const newUser = new user({name,email,password})
//     // const savedUser = await newUser.save()
//     const newUser = await user.create({ name, email, password });
//     if (!newUser) {
//       return res
//         .status(500)
//         .json({
//           message: "something went wrong while saving user",
//           success: false,
//         });
//     } else {
//       return res.status(200).json({ success: true, newUser });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message, success: false });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ message: "all fields required", success: false });

//     const existing_user = await user.findOne({ email });
//     if (!existing_user)
//       return res
//         .status(400)
//         .json({ message: "user doesnt exist cant login", success: false });
//     //user exists so check if the password is correct THEN give tokens
//     const correctPassword = await existing_user.isPasswordCorrect(password);
//     if (!correctPassword)
//       return res
//         .status(400)
//         .json({ message: "wrong password", success: false });
//     //if yes ,now we checked user exist,since he exist then we'll need tokens
//     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
//       existing_user._id
//     );
//     const loggedInUser = await user
//       .findById(existing_user._id)
//       .select("-password -refreshToken");

//     const options = {
//       httpOnly: true,
//       secure: true,
//     };

//     return res
//       .status(200)
//       .cookie("accesstoken", accessToken, options)
//       .cookie("refreshtoken", refreshToken, options)
//       .json({
//         message: "user logged in successfully",
//         success: true,
//         loggedInUser,
//         tokens: {
//           accessToken,
//           refreshToken,
//         },
//       });
//   } catch (error) {
//     return res.status(500).json({ message: error.message, success: false });
//   }
// };

// export const logout = async (req, res) => {
//   const logout_user = await user.findByIdAndUpdate(
//     req.User._id,
//     {
//       $unset: {
//         refreshToken: "",
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   const options = {
//     httpOnly:true,
//     secure:true
//   }

//   return res.status(200)
//   .clearCookie("accesstoken",options)
//   .clearCookie("refreshtoken",options)
//   .json({
//     message : "user logged out successfully",
//     success:true,
//     logout_user
//   })
// };





export const registerUser = async(req,res)=>{
  try {
    const {name,email,password} = req.body
   
    if(!name || !email || !password) return res.status(400).json({message:"all fields are required",success:false})
    const existingUser = await user.findOne({email})
    if(existingUser) return res.status(400).json({message :"user already exists",success:false})
    

    //technically our pre hook already hashes the password before save but normally we can also do it here
    // const hashhedpassword = bcrypt.hash(password,10)
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const verificationCodeExpiresIn = Date.now() + 10 * 60 * 1000;
    const newUser = await user.create({
      name,
      email,
      password,
      verificationToken,
      verificationCodeExpiresIn
    })
    if(!newUser) return res.status(500).json({message : "db error",success:false})
    await sendVerificationEmail(email,verificationToken)
    return res.status(200).json({message:"user registered successfully",success:true,newUser})



  } catch (err) {
     
      return res.status(500).json({message : `register user failed in first step || ${err.message}`,success:false})
    
  }
}

export const login = async(req,res)=>{
  try {
    const {email,password} = req.body
    console.log(req.body)
    if(!email || !password) return res.status(400).json({message:"all fields are required",success:false})
    
    const existingUser = await user.findOne({email})
    if(!existingUser) return res.status(400).json({message:"please register user first",success:false})
    
    const correctPassword = await existingUser.isPasswordCorrect(password)
    if(!correctPassword) return res.status(400).json({message:"invalid password",success:false})

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(existingUser._id)

    const loggedInUser =await  user.findOne({email}).select("-password -refreshToken")

    const options = {
      httpOnly:true,
      secure:true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
      message:"user logged in successfully",
      success:true,
      loggedInUser,
      tokens:{
        accessToken,
        refreshToken
      }
    })

  } catch (err) {
    return res.status(500).json({message : `login failed in first step || ${err.message}`,success:false})
  }
}

export const logout = async(req,res)=>{
  try {
    console.log(req.User)
    const logout_user = await user.findByIdAndUpdate(
      req.User._id,
      {
        $unset:{
          refreshToken:""
        }
      },
      {
        new :true
      }
    )
  console.log(logout_user)
    const options={
      httpOnly:true,    //prevent XSS attacks
      secure:true,
      sameSite : "strict", //prevents csrf attacks
      maxAge : 7*24*60*60*1000    //in milliseconds
    }
  
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
      message:"user logged out successfully",
      success:true,
      logout_user
    })
  } catch (err) {
    return res.status(500).json({message:`logout failed in first step || ${err.message}`})
  }
}
export const post = async(req,res)=>{
 return res.status(200).json({message : "posts"})
}
