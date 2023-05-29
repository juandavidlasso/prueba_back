import { Request, Response} from 'express'
import db from '../models'
import { axiosAgent } from '../utils/axiosAgent'
import dayjs from 'dayjs';
import { PRIVATE_KEY_PAYMENT } from '../utils/const'
import { AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid';

const calculatePaid = async (
	driverLatitude:number,
	driverLongitude:number,
	riderLatitude:number,
	riderLongitude:number,
	dateStartRide:any
) => {
	const date = new Date()
	const timeZome = dayjs(dateStartRide).format()
	const currentTime = dayjs(date).format()
	const date1 = dayjs(timeZome)
	const date2 = dayjs(currentTime)
	const difference = date2.diff(date1, 'minutes')
	
	const latitude = riderLatitude-driverLatitude
	const longitude = riderLongitude-driverLongitude
	const distanceKM = ((latitude+longitude)*1000)
	const distanceTime = (difference*200)
	const total = distanceKM+distanceTime+3500
	return total
}

const createTransaction = async (
	total:number,email:string,firstName:string,lastName:string,document:string,idPayment:number
) => {
	const request: AxiosResponse = await axiosAgent(
		'POST',
		'https://sandbox.wompi.co/v1/transactions',
		{
			'Authorization': `Bearer ${PRIVATE_KEY_PAYMENT}`
		},
		{
			"amount_in_cents": total,
			"currency": "COP",
			"customer_email": email,
			"payment_method": {
			  "installments": 2
			},
			"reference": `${firstName}-${uuidv4()}`,
			"payment_source_id": idPayment
		}
	)
	
	return request.data
}

export const calculateAmountPaid = async (req:Request, res:Response) => {
	const { idRide } = req.body

	try {
		if (!idRide ) return res.status(404).json({ error: 'You must enter the ride ID.' })
		if (Number(idRide) <= 0) return res.status(404).json({ error: 'The ride ID must be greater than 0.' })

		// Get the information of the ride
		const ride = await db.Rides.findOne({ where: { idRide } })

		// Return if the ride dont exists
		if (ride === null) return res.status(404).json({ error: `The ride with ID ${idRide} does not exist` })

		// Get the driver information
		const driver = await db.Drivers.findOne({ where: { idDriver: ride.dataValues.driverId } })

		const paid = await calculatePaid(
			driver.dataValues.latitude,
			driver.dataValues.longitude,
			ride.dataValues.latitude,
			ride.dataValues.longitude,
			ride.dataValues.timeRide
		)

		// Get the ID for the payment method for the user rider
		const getPaymentId = await db.Payments.findOne({ where: { riderId: ride.dataValues.riderId } })
		
		// Complete the ride for the user
		await db.Rides.create({
			riderId: ride.dataValues.riderId,
			driverId: ride.dataValues.driverId,
			latitude: ride.dataValues.latitude,
			longitude: ride.dataValues.longitude,
			status: 'FINISHED'
		})
		
		// Create the transaction
		const transaction = await createTransaction(
			paid,
			driver.dataValues.email,
			driver.dataValues.firstName,
			driver.dataValues.lastName,
			driver.dataValues.document,
			Number(getPaymentId.dataValues.idPayment)
		)
		
		return res.status(200).json(transaction)
	} catch (error:any) {
		return res.status(500).json({ message: error.message })
	}
}