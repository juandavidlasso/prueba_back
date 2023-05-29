import app from './app'
require('dotenv').config()


// Set port, listen for requests
const PORT = process.env.PORT || 8080;
try {
    app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	  });
} catch (error:any) {
    console.log(`Error occurred: ${error.message}`)
}
