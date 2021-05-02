import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appRoutes from './app.route';
import compression from 'compression';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.mongo();
    this.config();
    this.app.use(appRoutes);
  }

  private config(): void {
    this.app.use(express.json({ limit: '20Mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(compression());
    this.app.use(
      cors({
        origin: '*',
        allowedHeaders: [
          'Origin, Content, Accept, Content-Type, Authorization'
        ],
        methods: ['GET, POST, PUT, DELETE, PATCH, OPTIONS']
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private mongo(): void {
    const mongoURI = process.env.MONGO_URL || '';
    const option = {
      socketTimeoutMS: 3000,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 3000,
      useCreateIndex: true
    };
    const { connection } = mongoose;
    connection.on('connected', () => {
      console.log('Mongo Connection Established');
    });
    connection.on('reconnected', () => {
      console.log('Mongo Connection Reestablished');
    });
    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected');
      console.log('Trying to reconnect to Mongo ...');
      setTimeout(() => {
        mongoose.connect(mongoURI, option);
      }, 3000);
    });
    connection.on('close', () => {
      console.log('Mongo Connection Closed');
    });
    connection.on('error', (error: Error) => {
      console.log(`Mongo Connection ERROR: ${error}`);
    });

    const run = async () => {
      await mongoose.connect(mongoURI, option);
    };
    run().catch((error) => console.error(error));
  }
}

export default new App().app;
