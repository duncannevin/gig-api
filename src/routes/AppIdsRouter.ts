import {Router, Request, Response, NextFunction} from 'express';
const Apps = require('../../Seed/apps'); // Will switch to db later
import HandleDatabase from '../db/HandleDatabase';

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
    `;

    switch(req.headers.king_key) {
      case 'whereareyou':
        res.json(Apps);
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
        const appId: string = req.params.app_id;
        let app: Object = Apps.find(app => app.app_id === appId);

        if (app === undefined) {
          res.status(404).json('No apps found by that id');
          return;
        } else {
          res.json(app);
          return;
        }
      default:
        res.status(403).json('Forbidden');
    }
  }

  private createAppId(): string {
    return "testingitout";
  }

  /**
  * POST a new app also updates the app
  */
  public addOne = (req: Request, res: Response, next: NextFunction): void => {
    const queryStr: string = `
      INSERT INTO apps (app_id, access_key)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      app_id=VALUES(app_id),
      access_key=VALUES(access_key)
    `;
    let appId: string = !req.body.app_id ? this.createAppId() : req.body.app_id;

    HandleDatabase([appId, req.body.key], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Post new app failed');
        return;
      } else {
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
