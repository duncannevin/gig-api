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
  * GET all gigs based on freelancer username
  */
  public getFreelancer(req: Request, res: Response, next: NextFunction) {
    const freeLancer: string = req.params.freelancer;
    let gigs: [Object] = Gigs.filter(gig => gig.freelancer === freeLancer);

    if (gigs === undefined) {
      res.status(404).json('No gigs found with the freelancer');
    } else {
      res.json(gigs);
    }
  }

  /**
  * GET all gigs based on customer username
  */
  public getCustomer(req: Request, res: Response, next: NextFunction) {
    const customer: string = req.params.customer;
    let gigs: [Object] = Gigs.filter(gig => gig.customer === customer);

    if (gigs === undefined) {
      res.status(404).json('No gigs found with that customer');
    } else {
      res.json(gigs);
    }
  }

  /**
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/freelancer/:freelancer', this.getFreelancer);
    this.router.get('/customer/:customer', this.getCustomer);
  }
}

const gigRoutes = new GigsRouter();
gigRoutes.init();

export default gigRoutes.router;
