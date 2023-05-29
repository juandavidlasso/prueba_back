const axios = require("axios");

const url = 'http://localhost:3000';
  
describe('Initial route', () => {

	it('Get initial route', async () => {
		const res = await axios.get(url)

		expect(res).toBeTruthy()
		expect(res.status).toBe(200)
		expect(res.data).toEqual({
			message: 'Welcome to back test for WOMPI.'
		})
	})
})