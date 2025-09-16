import City from "../models/city.js"

export const getAll=(req,res)=>{
    City.find()
        .then(cities=>{
            res.status(200).send({cities})
        })
        .catch(err=>{
            res.status(500).send({error:err.message})
        })
    }
export const add=(req,res)=>{
    const{name}=req.body

    const newCity=new City({
        name
    })

    newCity.save()
    // לבדוק אם קיימת עיר כזו
    .then(city=>{
        res.status(200).send({message:`create city ${city._id} succeed`})
    })
    .catch(err=>{
        res.status(500).send({error: err.message})
    })
}