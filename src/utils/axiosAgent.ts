import axios, { AxiosError } from 'axios';

type MethodType = 'GET' | 'POST' | 'PUT'

export const axiosAgent = async (method: MethodType, url: string,headers?:object,body?:object) => {
	let response

	try {
		await axios({
			method,
			url,
			headers,
			data: body
		}).then(resp => {
			response = resp
		})
		.catch((error:AxiosError) => {
		  if (error.response) {
			response = error.response
		  }
		})

		return response;

		// const request = await axios({
		// 	method,
		// 	url,
		// 	headers,
		// 	data: body
		// })
		// return request.data
	} catch (error:any) {
		return error
	}
}