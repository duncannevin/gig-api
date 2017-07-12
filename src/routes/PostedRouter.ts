import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from '../db/HandleDatabase';
import * as _ from 'underscore';

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
    const queryStr: string = `
      SELECT * FROM posted
    `;

    HandleDatabase([], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all posted based on username
  */
  public getUser(req: Request, res: Response, next: NextFunction) {
    const userName: string = req.params.username;

    const queryStr: string = `
      SELECT * FROM posted
      WHERE username=?
    `;

    HandleDatabase([userName], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('No posts with that id');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * POST a new post
  */
  public addOne(req: Request, res: Response, next: NextFunction) {
    const queryStr = `
      INSERT INTO posted (${_.keys(req.body).join(',')})
      VALUES (${_.map(req.body, noth => '?').join(',')})
      ON DUPLICATE KEY UPDATE
      ${_.map(req.body, (val, key) => '\n' + key + '=VALUES(' + key + ')')}
    `;

    HandleDatabase(_.values(req.body), queryStr, (err, data) => {
      if (err) {
        console.log(err.message);
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * attach router to the appropriate end point.
  */
  init() {
    // Add end points here
    this.router.get('/', this.getAll);
    this.router.get('/user/:username', this.getUser);
    this.router.post('/', this.addOne);
  }
}

const postedRouter = new PostedRouter();
postedRouter.init();

export default postedRouter.router;
