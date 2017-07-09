import {Router, Request, Response, NextFunction} from 'express';
const Users = require('../../users'); // Will switch to db later

export class UsersRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all users
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.json(Users);
  }

  /**
  * GET a user by their username
  */
  public getOne(req: Request, res: Response, next: NextFunction) {
    const username: string = req.params.username;
    let userProfile: Object = Users.find(user => user.username === username);

    if (userProfile === undefined) {
      res.status(404).json('No user by that name found');
    } else {
      res.json(userProfile);
    }
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:username', this.getOne);
  }
}

// Create the UserRouter, and export its confiured Express.Router
const userRoutes = new UsersRouter();
userRoutes.init();

export default userRoutes.router;
