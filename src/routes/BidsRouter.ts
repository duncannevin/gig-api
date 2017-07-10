import {Router, Request, Response, NextFunction} from 'express';
const Bids = require('../../Seed/bids'); // Will switch to db later

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
  * GET all bids based on gig_id
  */
  public bidGig(req: Request, res: Response, next: NextFunction) {
    const gigId: string = req.params.gig_id;
    let bids: [Object] = Bids.filter(bid => bid.gig_id === parseInt(gigId));

    if (bids === undefined) {
      res.status(404).json('No bids found with that gig_id');
    } else {
      res.json(bids);
    }
  }

  /**
  * GET all bids based on username
  */
  public bidUser(req: Request, res: Response, next: NextFunction) {
    const userName: string = req.params.username;
    let bids: [Object] = Bids.filter(bid => bid.username === userName);

    if (bids === undefined) {
      res.status(404).json('No bids found with that username');
    } else {
      res.json(bids);
    }
  }

  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/gig/:gig_id', this.bidGig);
    this.router.get('/user/:username', this.bidUser);
  }
}

const bidRoutes = new BidsRouter();
bidRoutes.init();

export default bidRoutes.router;
