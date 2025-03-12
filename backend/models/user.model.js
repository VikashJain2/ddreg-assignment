import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next){
  try {
      if(!this.isModified("password")){
          next()
      }
  
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (password){
    try{
        return await bcrypt.compare(password,this.password)
    }catch(error){
        throw new Error(error)
    }
}
const userModel = mongoose.model("User", userSchema);

export default userModel;
