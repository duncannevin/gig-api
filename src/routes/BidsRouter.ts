import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from '../db/HandleDatabase';
import * as _ from 'underscore';

export class BidsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all bids where headers.app_id match
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      SELECT * FROM bids
      WHERE app_id=?
    `;

    HandleDatabase([req.headers.app_id], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all bids based on posted_id and headers.app_id
  */
  public bidGig(req: Request, res: Response, next: NextFunction) {
    const postedId: string = req.params.posted_id;
    const appId: string = req.headers.app_id;

    const queryStr: string = `
      SELECT * FROM bids
      WHERE posted_id=?
      and app_id=?
    `;

    HandleDatabase([postedId, appId], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('No bids for that post yet');
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all bids based on username and headers.app_id
  */
  public bidUser(req: Request, res: Response, next: NextFunction) {
    const userName: string = req.params.username;
    const appId: string = req.headers.app_id;

    const queryStr: string = `
      SELECT * FROM bids
      WHERE username=?
      and app_id=?
    `;

    HandleDatabase([userName, appId], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('No bids by that username found');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * POST a new bid app_id is part of body
  */
  public addOne(req: Request, res: Response, next: NextFunction) {
    const appId: string = req.headers.app_id
    , postedId: string = req.body.posted_id
    , username: string = req.body.username
    , price: string = req.body.price;

    const queryStr: string = `
      INSERT INTO bids (app_id, posted_id, username, price)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      app_id=VALUES(app_id),
      posted_id=VALUES(posted_id),
      price=VALUES(price)
    `;

    HandleDatabase([appId, postedId, username, price], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        res.status(201).json(data);
      }
    });
  }

  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/postedid/:posted_id', this.bidGig);
    this.router.get('/username/:username', this.bidUser);
    this.router.post('/', this.addOne);
  }
}

const bidRoutes = new BidsRouter();
bidRoutes.init();

export default bidRoutes.router;
