import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routesV1 from './Routes/v1/index';

const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/', routesV1);
app.all('*', (req, res) => {
  return res.send('This route is not defined');
});
export default app;
