import { Router } from 'express'
import { createPaymentMethodRider, requestRide } from '../controllers/rider.controller'
const router = Router()

router.post('/rider/payment-method', createPaymentMethodRider)
router.post('/rider/ride', requestRide)

export default router
