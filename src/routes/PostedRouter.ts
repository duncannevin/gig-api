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
  * GET all Posted where header.app_id matches
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      SELECT * FROM posted
      WHERE app_id=?
    `;

    HandleDatabase([req.headers.app_id], queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all posted based on type --> 'job' or 'product'
  */
  public getType(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      SELECT * FROM posted
      WHERE app_id=?
      and type=?
    `;

    HandleDatabase([req.headers.app_id, req.params.type], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all posted based on username and headers.app_id
  */
  public getUser(req: Request, res: Response, next: NextFunction) {
    const userName: string = req.params.username;
    const type: string = req.params.type;
    const appId: string = req.headers.app_id;

    const queryStr: string = `
      SELECT * FROM posted
      WHERE username=?
      and type=?
      and app_id=?
    `;

    HandleDatabase([userName, type, appId], queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  *  GET all posted based on a query
  */
  public getQuery(req: Request, res: Response, next: NextFunction) {
    const query: string = req.params.query;
    const type: string = req.params.type;

    const queryStr: string = `
      SELECT * FROM posted
      WHERE skills=?
      and type=?
    `;

    HandleDatabase([query, type], queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET a most based on is post_id
  */
  public getPostId(req: Request, res: Response, next: NextFunction) {
    const postId: string = req.params.postid;

    const queryStr: string = `
      SELECT * FROM posted
      WHERE posted_id=?
    `;

    HandleDatabase([postId], queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * POST a new post. app_id is included in body
  */
  public addOne(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      INSERT INTO posted (${_.keys(req.body).join(',')})
      VALUES (${_.map(req.body, noth => '?').join(',')})
      ON DUPLICATE KEY UPDATE
      ${_.map(req.body, (val, key) => '\n' + key + '=VALUES(' + key + ')')}
    `;

    HandleDatabase(_.values(req.body), queryStr, (err, data) => {
      if (err) {
        res.status(404);
        return;
      } else {
        res.json(data);
      }
    });
  }

  /*
  * DELETE post based on post_id
  **/
  public deleteOne(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      DELETE FROM posted
      WHERE posted_id=?
    `;

    HandleDatabase([req.params.postid], queryStr, (err, data) => {
      if (err) {
        res.status(404);
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
    this.router.get('/user/:username/:type', this.getUser);
    this.router.get('/query/:query/:type', this.getQuery);
    this.router.get('/getbytype/:type', this.getType);
    this.router.get('/getbypostid/:postid', this.getPostId);
    this.router.post('/', this.addOne);
    this.router.delete('/:postid', this.deleteOne);
  }
}

const postedRouter = new PostedRouter();
postedRouter.init();

export default postedRouter.router;
