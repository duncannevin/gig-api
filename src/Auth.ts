import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from './db/HandleDatabase';
import * as _ from 'underscore';

export class Auth {
  router: Router

  constructor() {}

  public checkForKey = (req: Request, res: Response, next: NextFunction): void => {
    const queryStr = `
      SELECT * FROM apps
      WHERE access_key=?
    `;

    HandleDatabase([req.headers.access_key], queryStr, (err, data) => {
      if (err) {
        res.status(403).json('Forbidden');
        return;
      } else {
        if (data.length === 1) {
          next();
          return;
        } else {
          res.status(403).json('Forbidden');
          return;
        }
      }
    });
  }
}

const auth = new Auth();
export default auth.checkForKey;
