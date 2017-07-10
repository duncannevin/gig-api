import {Router, Request, Response, NextFunction} from 'express';
const Posted = require('../../Seed/posted');

export class PostedRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all Posted
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.json(Posted);
  }

  /**
  * GET all posted based on username
  */
  public getUser(req: Request, res: Response, next: NextFunction) {
    const userName: string = req.params.username;
    let posts: [Object] = Posted.filter(post => post.username === userName);

    if (posts === undefined) {
      res.status(404).json('No posts found with that username');
    } else {
      res.json(posts);
    }
  }

  /**
  * attach router to the appropriate end point.
  */
  init() {
    // Add end points here
    this.router.get('/', this.getAll);
    this.router.get('/user/:username', this.getUser);
  }
}

const postedRouter = new PostedRouter();
postedRouter.init();

export default postedRouter.router;
