import {Router, Request, Response, NextFunction} from 'express';
const Gigs = require('../../gigs');

export class GigsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all Gigs
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.json(Gigs);
  }

  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
  }
}

const gigRoutes = new GigsRouter();
gigRoutes.init();

export default gigRoutes.router;
