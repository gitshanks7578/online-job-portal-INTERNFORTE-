import mongoose from "mongoose"

const dbConnect = async (req,res)=>{
    try {
        const connetionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("\nDB connected\n")
    } catch (error) {
        
        console.log("db connection failed\n",error.message)
        process.exit(1)
        //this is a serious error ,crash the app
    }
}

export default dbConnect

//MY PERSONAL NOTES - you may ignore
// we use connectionInstance to store an object for debugging (SKIPABLE)

// connectionInstance.connection.readyState // 0 = disconnected, 1 = connected, etc.
// connectionInstance.connection.name       // DB name
// connectionInstance.connection.host       // Host info
// connectionInstance.connection.port       // Port