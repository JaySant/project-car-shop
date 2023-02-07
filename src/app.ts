import express from 'express';
import ErrorHandler from './Middleware/ErrorHandle';
import router from './Routes/routes.car';
import routes from './Routes/routes.moto';

const app = express();
app.use(express.json());
app.use(ErrorHandler.handle);
app.use(router);
app.use(routes);

export default app;
