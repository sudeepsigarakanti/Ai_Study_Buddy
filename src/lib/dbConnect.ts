import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // Check for MONGODB_URI at runtime, not at build time
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable in your deployment settings'
        );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 75000,
            family: 4, // Force IPv4 to avoid Node 17+ IPv6 issues
        };

        console.log("Connecting to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log("MongoDB Connected Successfully");
            return mongoose;
        }).catch(err => {
            console.error("MongoDB Connection Failed:", err.message);
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
