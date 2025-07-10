import Note from "../models/Note.js";

export async function getAllNotes(req, res){
 try {
   const notes = await Note.findx()
   res.status(200).json(notes)

 } catch (error) {
   consolde.log("Eroor in getAllNotes controller" , error)
   res.status(500).json({message : "Internal Server error"});
 }
}

export function createNote(req, res){
   res.status(201).json({message : "Note created successfully"}); 
}

export function updateNote(req, res){
   res.status(200).json({message : "Note updated successfully"}); 
}

export function deleteNote(req, res){
   res.status(200).json({message : "Note deleted successfully"}); 
}