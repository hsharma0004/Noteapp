import Note from "../models/Note.js";

export async function getAllNotes(_, res){
 try {
   const notes = await Note.find().sort({createdAt:-1}) // newest first
   res.status(200).json(notes)

 } catch (error) {
   console.log("Error in getAllNotes controller" , error)
   res.status(500).json({message : "Internal Server error"});
 }
}

export async function getNoteByID(req, res){
   try {
      const note = await Note.findById(req.params.id);
      if(!note) return res.status(404).json({message:"Note not found"});
      res.json(note)

   } catch (error) {
      console.log("Error in getNote controller" , error)
      res.status(500).json({message : "Internal Server error"});
   }
}

export async function createNote(req, res){
   try {
      const {title,content} = req.body;
      const newNote = new Note({title,content});

      const savedNote = await newNote.save()
      res.status(201).json(savedNote);

   } catch (error) {
      console.log("Error in createNote controller" , error)
      res.status(500).json({message : "Internal Server error"});
   }
}

export async function updateNote(req, res){
   try {
      const {title , content} = req.body
      const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
         new : true,
      })
      if(!updatedNote) return res.status(404).json({message:"Note not found"})
      res.status(200).json(updatedNote);
   } catch (error) {
      console.log("Error in UpdateNote controller" , error)
      res.status(500).json({message : "Internal Server error"});
   }
}

export async function deleteNote(req, res){
   try {
      const deleteNote = await Note.findByIdAndDelete(req.params.id)
      if(!deleteNote) return res.status(404).json({message:"Note not found"});
      res.status(200).json({message:"Note Deleted Successfully"});

   } catch (error) {
      console.log("Error in DeleteNote controller" , error)
      res.status(500).json({message : "Internal Server error"});
   }
}