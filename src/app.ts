import express, { Application, Request, Response } from 'express'
import riderRoutes from './routes/rider.route'
import driverRoutes from './routes/driver.route'

const app: Application = express();

// Parse requests of content-type - application/json
app.use(express.json());

// Routes Rider
app.use(riderRoutes)
// Routes Driver
app.use(driverRoutes)

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple initial route
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Welcome to back test for WOMPI." });
});

export default app