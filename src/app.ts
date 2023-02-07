import express from 'express';
import routesCar from './Routes/routes.car';
import ErrorHandler from './Middleware/ErrorHandle';

const app = express();
app.use(express.json());
app.use(routesCar);
app.use(ErrorHandler.handle);

export default app;
