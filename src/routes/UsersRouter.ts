import {Router, Request, Response, NextFunction} from 'express';
const Users = require('../../Seed/users'); // Will switch to db later
import HandleDatabase from '../db/HandleDatabase';

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

  /**
  * POST a new user also updates the user.
  */
  public addOne(req: Request, res: Response, next: NextFunction) {
    const queryStr = `
      INSERT INTO users (app_id, username, first_name, last_name, profile_pic_url)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      app_id=VALUES(app_id),
      username=VALUES(username),
      first_name=VALUES(first_name),
      last_name=VALUES(last_name),
      profile_pic_url=VALUES(profile_pic_url)
    `;

    HandleDatabase([req.body.app_id, req.body.username, req.body.first_name,
      req.body.last_name, req.body.profile_pic_url], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Post new app failed');
        return;
      } else {
        res.json(data);
      }
    });
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:username', this.getOne);
    this.router.post('/', this.addOne);
  }
}

// Create the UserRouter, and export its confiured Express.Router
const userRoutes = new UsersRouter();
userRoutes.init();

export default userRoutes.router;
