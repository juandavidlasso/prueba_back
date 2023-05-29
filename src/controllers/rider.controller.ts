import { Request, Response} from 'express'
import db from '../models'
import { json } from 'sequelize';
import { axiosAgent } from '../utils/axiosAgent'
import { CREDIT_NUMBER, CREDIT_CVC, CREDIT_MONTH, CREDIT_YEAR, PRIVATE_KEY_PAYMENT, PUBLIC_KEY_PAYMENT } from '../utils/const'
import { AxiosResponse } from 'axios'

type PaymentType = 'CARD' | 'NEQUI'

const getPresignedToken = async () => {
	const request:AxiosResponse = await axiosAgent(
		'GET',
		`https://sandbox.wompi.co/v1/merchants/${PUBLIC_KEY_PAYMENT}`
	)
	
	return request.data
}

const setTokenCard = async (name: string) => {
	const request:AxiosResponse = await axiosAgent(
		'POST',
		'https://sandbox.wompi.co/v1/tokens/cards',
		{
			'Authorization': `Bearer ${PUBLIC_KEY_PAYMENT}`
		},
		{
			"number": CREDIT_NUMBER,
			"cvc": CREDIT_CVC,
			"exp_month": CREDIT_MONTH,
			"exp_year": CREDIT_YEAR,
			"card_holder": name
		}
	)
	return request.data
}

const setTokenNequi = async (number: string) => {
	const request:AxiosResponse = await axiosAgent(
		'POST',
		'https://sandbox.wompi.co/v1/tokens/nequi',
		{
			'Authorization': `Bearer ${PUBLIC_KEY_PAYMENT}`
		},
		{
			"phone_number": number
		}
	)
	return request.data
}

const getTokenNequiStatus = async (tokenId: string) => {
	const request:AxiosResponse = await axiosAgent(
		'GET',
		`https://sandbox.wompi.co/v1/tokens/nequi/${tokenId}`,
	)
	return request.data
}

const setPaymentSource = async (typePayment:PaymentType,tokenSource: string, tokenPresigned: string, email: string) => {
	const request:AxiosResponse = await axiosAgent(
		'POST',
		'https://sandbox.wompi.co/v1/payment_sources',
		{
			'Authorization': `Bearer ${PRIVATE_KEY_PAYMENT}`
		},
		{
			"type": typePayment,
			"token": tokenSource,
			"customer_email": email,
			"acceptance_token": tokenPresigned
		}
	)
	return request.data
}

export const createPaymentMethodRider = async (req:Request, res:Response) => {
	const { name, document, email, typePayment, phone } = req.body
	let tokenPaymentMethod
	let statusPaymentNequi

	try {
		if (!name || !document || !email || !typePayment ) return res.status(404).json({ error: 'You must enter your name, document, email and payment method (CARD, NEQUI).' })
		if (typePayment !== 'CARD' && typePayment !== 'NEQUI') return res.status(404).json({ error: 'The payment method must be CARD or NEQUI.' })
		if (typePayment=== 'NEQUI' && !phone) {
			return res.status(404).json({ error: 'For register NEQUI payment method you must enter your phone.' })
		}
		
		// Get presigned token of my local
		const presignedToken = await getPresignedToken()

		// Valid Token if CARD or NEQUI
		if (typePayment === 'CARD') {
			// Create token for CARD payment method
			tokenPaymentMethod = await setTokenCard(name)
		} else {
			// Create token for NEQUI payment method
			tokenPaymentMethod = await setTokenNequi(phone)
			// Get status for NEQUI payment source
			statusPaymentNequi = await getTokenNequiStatus(tokenPaymentMethod.data.id)
		}		

		// Create my soruce payment
		const paymentSource = await setPaymentSource(
			typePayment,
			typePayment === 'CARD' ? tokenPaymentMethod.data.id : statusPaymentNequi.data.id,
			presignedToken.data.presigned_acceptance.acceptance_token,
			email
		)
		
		const newRider = await db.Riders.create({
			name,
			document,
			email,
			phone
		})

		await db.Payments.create({
			idPayment: paymentSource.data.id,
			riderId: newRider.dataValues.idRider,
			typePayment: paymentSource.data.type,
			status: paymentSource.data.status
		})

		return res.status(200).send(json({
			message: `The payment method was sucessfully created for the user ${name}`,
			paymentMethod: `Your payment method is ${typePayment}`
		}))
	} catch (error:any) {
		return res.status(500).json({ message: error.message })
	}
}


export const requestRide = async (req:Request, res:Response) => {
	const { document, latitude, longitude } = req.body
	
	try {
		if (!document || !longitude || !latitude ) return res.status(404).json({ error: 'For request a ride you must enter your document, latitude and longitude.' })
		if(Number(longitude) <= 1500 || Number(latitude) <= 1500) return res.status(404).json({ error: 'The latitude and longitude must be greater than 1500.' })
		
		// Get the user that request a ride
		const currentUser = await db.Riders.findOne({ where: { document } });
		if (currentUser === null) return res.status(404).json({ error: `Username with document ${document} does not exist` })
		
		// Get an driver random
		const driverOption = await db.Drivers.findOne({ where: { idDriver: (Math.floor(Math.random() * (6 - 1) + 1)) } });
		
		// Create new ride for the user
		const newRide = await db.Rides.create({
			riderId: currentUser.dataValues.idRider,
			driverId: driverOption.dataValues.idDriver,
			latitude,
			longitude,
			status: 'PENDING'
		})

		res.status(200).send(json({
			welcome: `Welcome to WOMPI ${currentUser.dataValues.name}`,
			location: `Your current location is latitude: ${latitude}, longitude: ${longitude}`,
			driver: `The driver asigned to you is ${driverOption.dataValues.firstName} ${driverOption.dataValues.lastName}`,
			driverLocation: `The driver location is latitude: ${driverOption.dataValues.latitude}, longitude: ${driverOption.dataValues.longitude}`,
			message: 'Your ride start now',
			information: `You can finish this ride with this ID ${newRide.dataValues.idRide}`
		}))
	} catch (error:any) {
		return res.status(500).json({ message: error.message })
	}
}

