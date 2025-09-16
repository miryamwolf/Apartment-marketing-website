import Category from "../models/category.js"


export const getAll=(req,res)=>{
Category.find()
    .then(categories=>{
        res.status(200).send({categories})
    })
    .catch(err=>{
        res.status(500).send({error:err.message})
    })
}
export const create=(req,res)=>{
     const {name}=req.body

     const newCategory= new Category({
        name
     })
     newCategory.save()
     // לבדוק אם קיימת קטגןריה 
        .then(category=>{
            res.status(200).send({message: `create category${category._id} succeed!`})
        })
        .catch(err=>{
            res.status(500).send({error:err.message})
        })
     

}