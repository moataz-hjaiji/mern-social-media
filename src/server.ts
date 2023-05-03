import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// { path: `${__dirname}/../config.env`}
dotenv.config();

const DATABASE = process.env.DATABASE || ' ';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ' ';
const DB = DATABASE
  ? DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD)
  : 'undefined';
const PORT = process.env.PORT || 3000;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on PORT ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('Error : ', err);
  });
