import express from 'express';
import router from './routes/index.js';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
import { swaggerUi, specs } from './routes/swagger.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', router);
app.use(ErrorHandlingMiddleware);


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
