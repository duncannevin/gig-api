import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from '../db/HandleDatabase';
import * as _ from 'underscore';
const uId = require('uid');

export class AppsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all apps
  */
  public getAll(req: Request, res: Response, next: NextFunction) {

    const queryStr: string = `
      SELECT * FROM apps
    `;

    switch(req.headers.king_key) {
      case 'whereareyou':
        HandleDatabase([], queryStr, (err, data) => {
          if (err) {
            res.status(404).json('Apps getAll failed');
            return;
          } else {
            res.json(data);
          }
        });
        return;
      default:
        res.status(403).json('Forbidden');
        return;
    }
  }

  /**
  * GET an app based on its app_id
  */
  public getOne(req: Request, res: Response, next: NextFunction) {

    switch(req.headers.king_key) {
      case 'whereareyou':

        const appId = req.params.app_id;

        const queryStr: string = `
          SELECT * FROM apps
          WHERE app_id=?
        `;

        HandleDatabase([appId], queryStr, (err, data) => {
          if (err) {
            res.status(404).json('No app with that id found');
            return;
          } else {
            res.json(data);
          }
        });
      return;
      default:
        res.status(403).json('Forbidden');
    }
  }

  private createAppId(): string {
    return `gig${uId(20)}`;
  }

  /**
  * POST a new app also updates the app
  */
  public addOne = (req: Request, res: Response, next: NextFunction): void => {
    const queryStr: string = `
      INSERT INTO apps (app_id, access_key)
      VALUES (?, ?)`;

    let appId: string = !req.body.app_id ? this.createAppId() : req.body.app_id;

    HandleDatabase([appId, req.body.access_key], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Post new app failed');
        return;
      } else {
        data.app_id = appId;
        res.json(data);
      }
    });
  }

  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/getone/:app_id', this.getOne);
    this.router.post('/', this.addOne);
  }
}

const appsRoutes = new AppsRouter();
appsRoutes.init();

export default appsRoutes.router;
