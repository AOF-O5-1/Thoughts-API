"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'Cluster05-13';
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(MONGODB_URI);
    try {
        yield client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db(DATABASE_NAME);
        // Clear existing data
        yield db.collection('users').deleteMany({});
        yield db.collection('thoughts').deleteMany({});
        console.log('🗑 Cleared existing data');
        // Seed users
        const users = yield db.collection('users').insertMany([
            { username: 'Alice', email: 'alice@example.com', password: 'password123', friends: [] },
            { username: 'Bob', email: 'bob@example.com', password: 'password123', friends: [] },
        ]);
        console.log('👤 Users seeded');
        // Seed thoughts linked to users
        yield db.collection('thoughts').insertMany([
            { userId: users.insertedIds[0], thoughtText: 'This is Alice’s thought!', reactions: [] },
            { userId: users.insertedIds[1], thoughtText: 'This is Bob’s thought!', reactions: [] },
        ]);
        console.log('💭 Thoughts seeded');
        console.log('✅ Database seeding complete');
    }
    catch (error) {
        console.error('❌ Seeding error:', error);
    }
    finally {
        yield client.close();
        console.log('🔌 MongoDB connection closed');
    }
});
seedDatabase();
