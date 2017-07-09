import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// Router paths
import BidsRouter from './routes/BidsRouter';
import GigsRouter from './routes/GigsRouter';
import PostedRouter from './routes/PostedRouter';
import UsersRouter from './routes/UsersRouter';
import AppIdsRouter from './routes/AppIdsRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure express middleware
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // Configure API endpoints
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
    * working so far. This function will change when we start to add more
    * API endpoints.
    */
    let router = express.Router();
    // Add routes here
    this.express.use('/api/bids', BidsRouter);
    this.express.use('/api/gigs', GigsRouter);
    this.express.use('/api/posted', PostedRouter);
    this.express.use('/api/users', UsersRouter);
    this.express.use('/api/apps', AppIdsRouter);
  }
}

export default new App().express;
