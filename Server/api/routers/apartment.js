import express from 'express'
import { add, remove, update } from '../controllers/apartment.js'
const router= express.Router()
router.post('',add)
router.patch('/:id', update)
router.delete('/:id', remove)
export default router