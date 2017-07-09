import {Router, Request, Response, NextFunction} from 'express';
const Bids = require('../../bids'); // Will switch to db later

export class BidsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all bids
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.json(Bids);
  }

  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
  }
}

const bidRoutes = new BidsRouter();
bidRoutes.init();

export default bidRoutes.router;
