import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    }
});

//hash password before saving
userSchema.pre('save', async function() {
    
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
});

//compare password
userSchema.methods.comparePassword = async function(userPassword: string) {
    return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;