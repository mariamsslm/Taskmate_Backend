import Categorie from "../models/categorie.js";

export const createCategorie = async(req,res)=>{
    console.log("failed")
    try{
        const {name}= req.body;
        if (!name) {
      console.log({message:"falied"})
    }
       
        const newCategorie = new Categorie({
            name
        })
        await newCategorie.save()

        res.status(201).json(newCategorie)
         console.log(name)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"failed to create a new categorie"})

    }
}
// delete categorie authorized
export const deleteCategories =async(req,res)=>{
    try{
        const categoriId = req.params.id 
        const deleteCategorie = await Categorie.findByIdAndDelete(categoriId)
        return res.status(200).json({message:"categorie delete succefuly"})

    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"failed to delete categorie"})
    }
}
//edit  categorie authorized
export const editCategory = async (req, res) => {
  try {
    const categorieId = req.params.id;
    const { name } = req.body;

    const categorie = await Categorie.findById(categorieId);  // تأكد اسم الموديل
    if (!categorie) {
      return res.status(404).json({ message: "Category not found" });
    }

    categorie.name = name;
    const editedCategorie = await categorie.save();

    res.status(200).json(editedCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update category", error: error.message });
  }
};

//get all categorie 
export const getAllCAtegorie = async(req,res)=>{
  try{
    const getAll = await Categorie.find()
    res.status(200).json({message:getAll})
  }
  catch(error){
    console.error(error)
    res.status(500).json({message:"error"})
  }

}
