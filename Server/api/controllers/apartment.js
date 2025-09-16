
import Apartment from "../models/apartment.js"
import Category from "../models/category.js"
import City from "../models/city.js"
import Advertiser from "../models/advertiser.js"

export const add=async(req,res)=>{
   try{
    const{name,description,img,category,city,address
        ,numBeds,price,advertiser}=req.body
    
     const newApartment= new Apartment({
        name,
        description,
        img,
        category,
        city,
        address,
        numBeds,
        price,
        advertiser
    })
    const savedApartment = await newApartment.save();
      // עדכון הקטגוריה, העיר והמשווק
      await Category.findByIdAndUpdate(category, { $push: { apartments: savedApartment._id } });
      await City.findByIdAndUpdate(city, { $push: { apartments: savedApartment._id } });
      await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: savedApartment._id } });
      res.status(200).send({message:`creat apartment ${savedApartment._id} succeed!!!!!!! all arraysApartment were update!`});
}
catch{
    res.status(500).send({ error: err.message });
}
    // .then(apartments=>{
    //     res.status(200).send({message:`create apartment ${apartments._id} succeed!`})
    // })
    // .catch(err=>{
    //     res.status(500).send({error:err.message})
    // })

}
export const update = (req, res) => {

    const { id } = req.params

    Apartment.findByIdAndUpdate(id, req.body, { new: true })
        .then(apartment => {
            res.status(200).send({ message: `update apartment ${apartment._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

} 
export const remove = (req, res) => {

    const { id } = req.params

    Apartment.findByIdAndDelete(id)
        .then(apartment => {
            res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}