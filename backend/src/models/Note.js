import mongoose from 'mongoose';

// Create schema
// model based off that schema

const noteSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  content: {
    type : String,
    required : true
  },
},
  {timestamps: true} // createdAt , UpdatedAt
);

const Note = mongoose.model("Note",noteSchema)

export default Note