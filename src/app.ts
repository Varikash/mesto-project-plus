import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req: Request | any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6681bc86615c909024a2fd9b',
  };
  next();
});
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Cервер запущен на порту ${PORT}`);
});
