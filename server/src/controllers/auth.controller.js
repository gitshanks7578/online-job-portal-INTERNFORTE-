// import { user } from "../models/user.model.js";
// import { deleteUserAndData } from "../utils/deleteUserAndData.js";
// import { sendVerificationEmail } from "../utils/mailtrap/emails.js";
// // functions we learnt

// // .create({})              takes Object
// // .find()                  gives full list
// // .findById()              takes mongodb _id STRING FORMAT
// // .findByIdAndUpdate()     takes id and two objects
// // +one for data
// // +one for schema_validation and instant updation

// // const generateAccessAndRefreshTokens = async (userid) => {
// //   let checkuser, accessToken, refreshToken;
// //   try {
// //     checkuser = await user.findById(userid);
// //     if (!checkuser) throw new Error("user not found for token generation");

// //     accessToken = checkuser.generateAccessToken();
// //     refreshToken = checkuser.generateRefreshToken();
// //   } catch (error) {
// //     return res
// //       .status(500)
// //       .json({
// //         message: `token generation didnt even started\n${error.message}`,
// //         success: false,
// //       });
// //   }
// //   checkuser.refreshToken = refreshToken;
// //   await checkuser.save({ validateBeforeSave: false });
// //   return { accessToken, refreshToken };
// // };

// const generateAccessAndRefreshTokens = async(userid) =>{
//   let checkuser,refreshToken,accessToken;
//   try {
//     checkuser = await user.findById(userid)
//     if(!checkuser) throw new Error(500,"token generation failed ,couldnt find user")
    
//     refreshToken = checkuser.generateRefreshToken()
//     accessToken = checkuser.generateAccessToken()
//   } catch (err) {
//     throw new Error(500,"tokens couldnt generate in first place")
//   }

//   checkuser.refreshToken = refreshToken
//   await checkuser.save({validateBeforeSave : false})
//   return {accessToken,refreshToken}
// }


// // export const createUser = async (req, res) => {
// //   try {
// //     const { name, email } = req.body;
// //     //when we take and say   !name or !email this means either we'll get an object or UNDEFINED...undefined simply means there was no entry
// //     if (!name || !email)
// //       return res
// //         .status(400)
// //         .json({ message: "all fields are required", success: false });

// //     const newUser = await user.create({ name, email });
// //     return res
// //       .status(200)
// //       .json({ message: "user created successfully", success: true });
// //   } catch (error) {
// //     return res.status(500).json({ message: "server error", success: false });
// //   }
// // };

// // export const getUsers = async (req, res) => {
// //   try {
// //     const users = await user.find();
// //     return res.status(200).json({ success: true, users });
// //   } catch (error) {
// //     return res.status(500).json({ message: "server error", success: false });
// //   }
// // };

// // export const getSpecificUser = async (req, res) => {
// //   try {
// //     const specific_user = await user.findById(req.params.id);
// //     if (!specific_user)
// //       return res
// //         .status(400)
// //         .json({ message: "user doesnt exist", success: false });

// //     return res.status(200).json({ success: true, specific_user });
// //   } catch (error) {
// //     return res.status(500).json({ message: "server error", success: false });
// //   }
// // };

// // export const updateUser = async (req, res) => {
// //   try {
// //     const update_user = await user.findByIdAndUpdate(
// //       req.params.id,
// //       { name: req.body.name, email: req.body.email },

// //       // new:true ->instant front end response needed if u dont care to show and update silently then dont use it
// //       //   runvalidators - Mongoose does NOT run schema validators (like required, minlength, enum) on findByIdAndUpdate by default.

// //       { new: true, runValidators: true }
// //     );

// //     if (!update_user)
// //       return res
// //         .status(400)
// //         .json({ message: "user doesnt exist", success: false });
// //     return res
// //       .status(200)
// //       .json({ message: "updated successfully", success: true });
// //   } catch (error) {
// //     return res.status(500).json({ message: "server error", success: false });
// //   }
// // };

// // export const deleteUser = async (req, res) => {
// //   try {
// //     const delete_user = await user.findByIdAndDelete(req.params.id);
// //     if (!delete_user)
// //       return res
// //         .status(400)
// //         .json({ message: "user doesnt exist", success: false });

// //     return res
// //       .status(200)
// //       .json({ message: "deleted successfully", success: true });
// //   } catch (error) {
// //     return res.status(500).json({ message: "server error", success: false });
// //   }
// // };

// // export const registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password)
// //       return res
// //         .status(400)
// //         .json({ message: "all fields are required", success: false });
// //     const existingUser = await user.findOne({ email });
// //     if (existingUser)
// //       return res
// //         .status(400)
// //         .json({ message: "user already exists", success: false });

// //     // const newUser = new user({name,email,password})
// //     // const savedUser = await newUser.save()
// //     const newUser = await user.create({ name, email, password });
// //     if (!newUser) {
// //       return res
// //         .status(500)
// //         .json({
// //           message: "something went wrong while saving user",
// //           success: false,
// //         });
// //     } else {
// //       return res.status(200).json({ success: true, newUser });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message, success: false });
// //   }
// // };

// // export const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password)
// //       return res
// //         .status(400)
// //         .json({ message: "all fields required", success: false });

// //     const existing_user = await user.findOne({ email });
// //     if (!existing_user)
// //       return res
// //         .status(400)
// //         .json({ message: "user doesnt exist cant login", success: false });
// //     //user exists so check if the password is correct THEN give tokens
// //     const correctPassword = await existing_user.isPasswordCorrect(password);
// //     if (!correctPassword)
// //       return res
// //         .status(400)
// //         .json({ message: "wrong password", success: false });
// //     //if yes ,now we checked user exist,since he exist then we'll need tokens
// //     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
// //       existing_user._id
// //     );
// //     const loggedInUser = await user
// //       .findById(existing_user._id)
// //       .select("-password -refreshToken");

// //     const options = {
// //       httpOnly: true,
// //       secure: true,
// //     };

// //     return res
// //       .status(200)
// //       .cookie("accesstoken", accessToken, options)
// //       .cookie("refreshtoken", refreshToken, options)
// //       .json({
// //         message: "user logged in successfully",
// //         success: true,
// //         loggedInUser,
// //         tokens: {
// //           accessToken,
// //           refreshToken,
// //         },
// //       });
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message, success: false });
// //   }
// // };

// // export const logout = async (req, res) => {
// //   const logout_user = await user.findByIdAndUpdate(
// //     req.User._id,
// //     {
// //       $unset: {
// //         refreshToken: "",
// //       },
// //     },
// //     {
// //       new: true,
// //     }
// //   );

// //   const options = {
// //     httpOnly:true,
// //     secure:true
// //   }

// //   return res.status(200)
// //   .clearCookie("accesstoken",options)
// //   .clearCookie("refreshtoken",options)
// //   .json({
// //     message : "user logged out successfully",
// //     success:true,
// //     logout_user
// //   })
// // };





// export const registerUser = async(req,res)=>{
//   try {
//     const {name,email,password} = req.body
   
//     if(!name || !email || !password) return res.status(400).json({message:"all fields are required",success:false})
//     const existingUser = await user.findOne({email})
//     if(existingUser) return res.status(400).json({message :"user already exists",success:false})
    

//     //technically our pre hook already hashes the password before save but normally we can also do it here
//     // const hashhedpassword = bcrypt.hash(password,10)
//     const verificationToken = Math.floor(100000 + Math.random() * 900000);
//     const verificationCodeExpiresIn = Date.now() + 10 * 60 * 1000;
//     const newUser = await user.create({
//       name,
//       email,
//       password,
//       verificationToken,
//       verificationCodeExpiresIn
//     })
//     if(!newUser) return res.status(500).json({message : "db error",success:false})
//     return res.status(200).json({message:"user registered successfully",success:true,newUser})



//   } catch (err) {
     
//       return res.status(500).json({message : `register user failed in first step || ${err.message}`,success:false})
    
//   }
// }

// export const login = async(req,res)=>{
//   try {
//     const {email,password} = req.body
//     console.log(req.body)
//     if(!email || !password) return res.status(400).json({message:"all fields are required",success:false})
    
//     const existingUser = await user.findOne({email})
//     if(!existingUser) return res.status(400).json({message:"please register user first",success:false})
    
//     const correctPassword = await existingUser.isPasswordCorrect(password)
//     if(!correctPassword) return res.status(400).json({message:"invalid password",success:false})

//     const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(existingUser._id)

//     const loggedInUser =await  user.findOne({email}).select("-password -refreshToken")

//     const options = {
//       httpOnly:true,
//       secure:true
//     }
//     return res.status(200)
//     .cookie("accessToken",accessToken,options)
//     .cookie("refreshToken",refreshToken,options)
//     .json({
//       message:"user logged in successfully",
//       success:true,
//       loggedInUser,
//       tokens:{
//         accessToken,
//         refreshToken
//       }
//     })

//   } catch (err) {
//     return res.status(500).json({message : `login failed in first step || ${err.message}`,success:false})
//   }
// }

// export const logout = async(req,res)=>{
//   try {
//     console.log(req.User)
//     const logout_user = await user.findByIdAndUpdate(
//       req.User._id,
//       {
//         $unset:{
//           refreshToken:""
//         }
//       },
//       {
//         new :true
//       }
//     )
//   console.log(logout_user)
//     const options={
//       httpOnly:true,    //prevent XSS attacks
//       secure:true,
//       sameSite : "strict", //prevents csrf attacks
//       maxAge : 7*24*60*60*1000    //in milliseconds
//     }
  
//     return res.status(200)
//     .clearCookie("accessToken",options)
//     .clearCookie("refreshToken",options)
//     .json({
//       message:"user logged out successfully",
//       success:true,
//       logout_user
//     })
//   } catch (err) {
//     return res.status(500).json({message:`logout failed in first step || ${err.message}`})
//   }
// }

// export const verify_email = async(req,res)=>{
//   try {
//     const {email,token} = req.body;
//     if(!token || !email) return res.status(400).json({message:"otp is required",success:false})
    
//     const current_user = await user.findOne({
//       email,
//       verificationToken:token,
//       verificationCodeExpiresIn : {
//         $gt : Date.now()
//       }
//     })

//     if(!current_user) return res.status(400).json({message:"invalid verifcation token",success:false})
//     current_user.isVerified = true
//     current_user.verificationToken = undefined
//     current_user.verificationCodeExpiresIn = undefined
//     await user.save()

//     await sendWelcomeEmail(current_user.email,current_user.name)

//     return res.status(200).json({message : "user veriified",success:true})
 
    
//   } catch (error) {
//     return res.status(500).json({message :`verify email first step failed ${error.message}`,success:false})
//   }
// }
// export const forgetPassword = async(req,res)=>{
//   try {
//     const {email,newPassword,confirmPassword} = req.body
//     if(!newPassword || !confirmPassword) return res.status(400).json({message:"all fields are required",success:false})
//     if(newPassword !== confirmPassword)
//     return res.status(400).json({message:"both fields should be same",success:false})
//     const user_in_db =  await user.findOne({email})
//     user_in_db.password = confirmPassword
//     user_in_db.verificationToken = undefined
//     user_in_db.verificationCodeExpiresIn = undefined
//     user_in_db.isVerified = undefined
//     await user_in_db.save()
//     return res.status(200).json({message:"password changed successfully",success:true})
    

//   } catch (error) {
//     return res.status(500).json({message:`forget_password in first step || ${error.message}`})
//   }
// }

// // u can also define path : "" in cookies ,clearCookie function wont work if the cookies do not have same path 
// export const removeUser = async(req,res)=>{
//   try {
//     // const user_for_deletion = await user.findByIdAndDelete(req.User._id)
//     // if(!user_for_deletion) return res.status(400).json({message : "no such user found for deletion",success:false})
//     const user_for_deletion = await deleteUserAndData(req.User._id)
//     if(!user_for_deletion) return res.status(400).json({message:"no such user found",success:false})

//     const options = {
//       httpOnly:true,
//       secure:true
//     }
//     return res.status(200)
//     .clearCookie("refreshToken",options)
//     .clearCookie("accessToken",options)
//     .json({message:"user deleted successfully" , success:true,user_for_deletion})
//   } catch (error) {
//     return res.status(500).json({message:`user deletion failed in first step || ${error.message} `})
//   }
// }




// export const post = async(req,res)=>{
//  return res.status(200).json({message : "posts"})
// }



import { user } from "../models/user.model.js";
import { deleteUserAndData } from "../utils/deleteUserAndData.js";
import { sendVerificationEmail } from "../utils/mailtrap/emails.js";

//just a helper function to generate both access and refresh tokens all together
const generateAccessAndRefreshTokens = async (userid) => {
  let checkuser, refreshToken, accessToken;
  try {
    checkuser = await user.findById(userid);
    if (!checkuser) throw new Error("token generation failed, couldn't find user");

    // JWT already includes role from user model
    refreshToken = checkuser.generateRefreshToken();
    accessToken = checkuser.generateAccessToken();
  } catch (err) {
    throw new Error("tokens couldn't generate in first place");
  }

  checkuser.refreshToken = refreshToken;
  await checkuser.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "all fields are required", success: false });

    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(role))
      return res.status(400).json({ message: "Invalid role selected", success: false });

    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists", success: false });

    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const verificationCodeExpiresIn = Date.now() + 10 * 60 * 1000;

    const newUser = await user.create({
      name,
      email,
      password,
      role, // comes from frontend radio input
      verificationToken,
      verificationCodeExpiresIn,
    });

    if (!newUser) return res.status(500).json({ message: "db error", success: false });

    return res
      .status(200)
      .json({ message: `${role} registered successfully`, success: true, newUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `register user failed || ${err.message}`, success: false });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "all fields are required", success: false });

    const existingUser = await user.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "please register first", success: false });

    const correctPassword = await existingUser.isPasswordCorrect(password);
    if (!correctPassword)
      return res.status(400).json({ message: "invalid password", success: false });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id);

    const loggedInUser = await user
      .findOne({ email })
      .select("-password -refreshToken");

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "user logged in successfully",
        success: true,
        loggedInUser,
        tokens: { accessToken, refreshToken },
      });
  } catch (err) {
    return res.status(500).json({ message: `login failed || ${err.message}`, success: false });
  }
};


export const logout = async (req, res) => {
  try {
    const logout_user = await user.findByIdAndUpdate(
      req.User._id,
      { $unset: { refreshToken: "" } },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        message: "user logged out successfully",
        success: true,
        logout_user,
      });
  } catch (err) {
    return res.status(500).json({ message: `logout failed || ${err.message}`, success: false });
  }
};

//the email verification feature is not fully completed and is under work
export const verify_email = async (req, res) => {
  try {
    const { email, token } = req.body;
    if (!token || !email)
      return res.status(400).json({ message: "otp is required", success: false });

    const current_user = await user.findOne({
      email,
      verificationToken: token,
      verificationCodeExpiresIn: { $gt: Date.now() },
    });

    if (!current_user)
      return res.status(400).json({ message: "invalid verification token", success: false });

    current_user.isVerified = true;
    current_user.verificationToken = undefined;
    current_user.verificationCodeExpiresIn = undefined;
    await current_user.save();

    await sendVerificationEmail(current_user.email, current_user.name);

    return res.status(200).json({ message: "user verified", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `verify email failed || ${error.message}`, success: false });
  }
};


export const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword)
      return res.status(400).json({ message: "all fields are required", success: false });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "both fields should match", success: false });

    const user_in_db = await user.findOne({ email });
    user_in_db.password = confirmPassword;
    user_in_db.verificationToken = undefined;
    user_in_db.verificationCodeExpiresIn = undefined;
    user_in_db.isVerified = undefined;
    await user_in_db.save();

    return res.status(200).json({ message: "password changed successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `forget password failed || ${error.message}`, success: false });
  }
};


export const removeUser = async (req, res) => {
  try {
    const user_for_deletion = await deleteUserAndData(req.User._id);
    if (!user_for_deletion)
      return res.status(400).json({ message: "no such user found", success: false });

    const options = { httpOnly: true, secure: true };
    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json({ message: "user deleted successfully", success: true, user_for_deletion });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `user deletion failed || ${error.message}`, success: false });
  }
};

//dummy
export const post = async (req, res) => {
  return res.status(200).json({ message: "posts" });
};
