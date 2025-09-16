import express from "express"
import { add, getAll } from "../controllers/city.js"

const router= express.Router()
 router.get('',getAll)
 router.post('',add)
 export default router