import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import clerkWebhookRoute from './api/webhooks/routes.ts';
import { connectDB } from './lib/db.ts';
import { logger } from './middlewares/logger.ts';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//middlewares
app.use(logger);

//test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

//routes
app.use('/api/webhooks', clerkWebhookRoute);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
}); 

