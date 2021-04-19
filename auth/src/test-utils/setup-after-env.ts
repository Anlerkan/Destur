import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { EmailSender } from '../utils';

let mongoMemoryServer: MongoMemoryServer;
mongoose.set('useFindAndModify', false);

//  Before everything:
//  1.Create an instance of MongoDB server
//  2.Connect to MongoDB server via mongoose
beforeAll(async () => {
  mongoMemoryServer = new MongoMemoryServer();
  const mongoUri = await mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

//  Before each test
//  3.Clean up the database
beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();

  allCollections.forEach(async (collection) => {
    await collection.deleteMany({});
  });

  EmailSender.resetEmailSenderInstance();
  jest.clearAllMocks();
});

//  After all tests
//  4.Close the connection with the database
afterAll(async () => {
  mongoMemoryServer.stop();
  mongoose.connection.close();
});
