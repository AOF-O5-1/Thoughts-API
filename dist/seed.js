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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./models/users"));
const thoughts_1 = __importDefault(require("./models/thoughts"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ThoughtShare';
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_URI, {});
        console.log('✅ Database ThoughtShare created successfully');
    }
    catch (error) {
        console.error('❌ Error creating database:', error);
        process.exit(1);
    }
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createDatabase();
        // Clear existing data
        yield users_1.default.deleteMany({});
        yield thoughts_1.default.deleteMany({});
        console.log('🗑 Cleared existing data');
        // Seed users
        const users = yield users_1.default.insertMany([
            { username: 'Alice', email: 'alice@example.com', password: 'password123' },
            { username: 'Bob', email: 'bob@example.com', password: 'password123' },
        ]);
        console.log('👤 Users seeded');
        // Seed thoughts
        const thoughts = yield thoughts_1.default.insertMany([
            { thoughtText: 'This is my first thought!', username: 'Alice', reactions: [] },
            { thoughtText: 'Hello world!', username: 'Bob', reactions: [] },
        ]);
        console.log('💭 Thoughts seeded');
        console.log('✅ Database seeding complete');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
});
seedDatabase();
