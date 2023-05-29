import { Router } from 'express'
import { calculateAmountPaid } from '../controllers/driver.controller'
const router = Router()

router.post('/driver', calculateAmountPaid)

export default router
