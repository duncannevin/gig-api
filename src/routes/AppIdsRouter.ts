import {Router, Request, Response, NextFunction} from 'express';
const Apps = require('../../apps'); // Will switch to db later

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
  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/getone/:app_id', this.getOne);
  }
}

const appsRoutes = new AppsRouter();
appsRoutes.init();

export default appsRoutes.router;
