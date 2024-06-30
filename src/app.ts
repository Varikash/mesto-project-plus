import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mesttodb');

app.use((req: Request | any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '66с108c56л2484d7f267259',
  };
  next();
});
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Cервер запущен на порту ${PORT}`);
});
