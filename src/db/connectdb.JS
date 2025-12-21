import mongoose from 'mongoose';


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

export default connectdb;