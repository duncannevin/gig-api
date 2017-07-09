import {Router, Request, Response, NextFunction} from 'express';
const Posted = require('../../posted');

export class PostedRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all Posted
  */
  public getAll(req: Request, res: Response, nest: NextFunction) {
    res.json(Posted);
  }

  /**
  * attach router to the appropriate end point.
  */
  init() {
    // Add end points here
    this.router.get('/', this.getAll);
  }
}

const postedRouter = new PostedRouter();
postedRouter.init();

export default postedRouter.router;
