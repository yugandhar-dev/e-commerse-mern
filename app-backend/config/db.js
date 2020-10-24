import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log(
      `Mongo DB connected: ${conn.connection.host}`.bgCyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed.bold);
    process.exit(1);
  }
};

export default connectDB;
