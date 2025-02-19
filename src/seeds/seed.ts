 import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'Cluster05-13';

const seedDatabase = async () => {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    const db = client.db(DATABASE_NAME);

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('thoughts').deleteMany({});
    console.log('🗑 Cleared existing data');

    // Seed users
    const users = await db.collection('users').insertMany([
      { username: 'Alice', email: 'alice@example.com', password: 'password123', friends: [] },
      { username: 'Bob', email: 'bob@example.com', password: 'password123', friends: [] },
    ]);
    console.log('👤 Users seeded');

    // Seed thoughts linked to users
    await db.collection('thoughts').insertMany([
      { userId: users.insertedIds[0], thoughtText: 'This is Alice’s thought!', reactions: [] },
      { userId: users.insertedIds[1], thoughtText: 'This is Bob’s thought!', reactions: [] },
    ]);
    console.log('💭 Thoughts seeded');

    console.log('✅ Database seeding complete');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  } 
};

seedDatabase();

