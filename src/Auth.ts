import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from './db/HandleDatabase';
import * as _ from 'underscore';

export class Auth {
  router: Router

  constructor() {}

  public checkForKey = (req: Request, res: Response, next: NextFunction): void => {

    switch(req.headers.king_key) {

      case 'whereareyou':
        next();
        return;
      default:
        const queryStr = `
          SELECT * FROM apps
          WHERE access_key=?
        `;

        HandleDatabase([req.headers.access_key], queryStr, (err, data) => {
          if (err) {
            res.status(403);
            return;
          } else {
            if (data.length >= 1) {
              next();
              return;
            } else {
              res.status(403);
              return;
            }
          }
        });
    }

  }
}

const auth = new Auth();
export default auth.checkForKey;
