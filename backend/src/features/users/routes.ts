import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './Model.ts';

const router = express.Router();

const generateToken = (userId: mongoose.Types.ObjectId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '15d' });
}

router.get('/test', (req, res) => {
    res.send('Hello World');
});

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'})
        }

        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            email,
            username,
            password,
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({ 
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    
    try {
        const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await (user as any).comparePassword(password);
    
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ 
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });

    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;