import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './features/users/routes.ts';
import { connectDB } from './lib/db.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

//routes
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
}); 

