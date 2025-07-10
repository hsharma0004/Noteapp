export function getAllNotes(req, res){
  res.status(200).send("You Fetched the notes");
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