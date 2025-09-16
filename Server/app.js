import express from 'express'

import categoryRouter from './api/routers/category.js'
import apartmentRouter from './api/routers/apartment.js'
import cityRouter from './api/routers/city.js'

import bodyParser from 'body-parser'

import mongoose from 'mongoose';

const app=express()
const port=3001

app.use(bodyParser.json())


mongoose.connect(`mongodb://localhost:27017/Apartments_DB`)
.then(()=>{
    console.log('connect to mongoDB! ☺️');
})
.catch(err=>{
   console.log({error: err.message});
   
    
})
app.use('/category',categoryRouter)
app.use('/apartment',apartmentRouter)
app.use('/city',cityRouter)

app.listen(port,()=>{
    console.log(`my applicatoin run in http://localhost:${port}`);
    
})
