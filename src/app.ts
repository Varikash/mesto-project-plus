import express, {
  urlencoded,
} from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/index';
import { createUser, loginUser } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';
import auth from './middlewares/auth';
import handleErrors from './errors/handleErrors';
import { signInValidation, signUpValidation } from './utilits/validation';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(requestLogger);
app.post('/signin', signInValidation, loginUser);
app.post('/signup', signUpValidation, createUser);

app.use(auth);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Cервер запущен на порту ${PORT}`);
});
