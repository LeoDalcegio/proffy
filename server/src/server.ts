import express from 'express';
import routes from './routes';
import cors from 'cors';
import helmet from 'helmet';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
