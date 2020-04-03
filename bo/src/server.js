import express from 'express';
import bodyParser from 'body-parser';
import apiV1 from './routes/api/v1/router.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = express.Router();
routes.use('/api/v1/', apiV1);

app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));