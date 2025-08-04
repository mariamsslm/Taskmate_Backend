import mongoose from "mongoose";
const taskModelSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:false
        },
        status:{
            type:String,
            required:true,
            enum:["pending","in_progress","completed"]
        },
        priority: {
            type: String,
            required: false,
            enum: ["low", "medium", "high"],
            default: "medium"
          },
          deadline: {
            type: Date,
            required: false,
          },
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        categorieID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Categorie",
            required:true
        }

},{
    timestamps:true
})
const Task = mongoose.model("Task",taskModelSchema)
export default Task;