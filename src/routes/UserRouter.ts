import {Router, Request, Response, NextFunction} from 'express';
const Users = require('../../users'); // Will switch to db later

export class UserRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    res.json(Users);
  }

  init() {
    this.router.get('/', this.getAll);
  }
}

// Create the UserRouter, and export its confiured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
