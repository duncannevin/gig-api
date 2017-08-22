import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from '../db/HandleDatabase';
import * as _ from 'underscore';

export class UsersRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all users where header.app_id matches
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      SELECT * FROM users
      WHERE app_id=?
    `;

    HandleDatabase([req.headers.app_id], queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET a user by their username and header.app_id
  */
  public getOne(req: Request, res: Response, next: NextFunction) {
    const username: string = req.params.username;
    const appId: string = req.headers.app_id;

    const queryStr: string = `
      SELECT * FROM users
      WHERE username=?
      and app_id=?
    `;

    HandleDatabase([username, appId, username, username], queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * POST a new user also updates the user. app_id is part of
  * body
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

    const params = [
      req.body.app_id,
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.profile_pic_url,
    ];

    HandleDatabase(params, queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:username/', this.getOne);
    this.router.post('/', this.addOne);
  }
}

// Create the UserRouter, and export its confiured Express.Router
const userRoutes = new UsersRouter();
userRoutes.init();

export default userRoutes.router;
