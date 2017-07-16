import {Router, Request, Response, NextFunction} from 'express';
import HandleDatabase from '../db/HandleDatabase';
import * as _ from 'underscore';

export class GigsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * GET all Gigs where header.app_id match
  */
  public getAll(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      SELECT * FROM gigs
      WHERE app_id=?
    `;

    HandleDatabase([req.headers.app_id], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('Oops something went wrong');
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all gigs based on freelancer username and
  * headers.app_id
  */
  public getFreelancer(req: Request, res: Response, next: NextFunction) {
    const freeLancer: string = req.params.freelancer;
    const appId: string = req.headers.app_id;

    const queryStr: string = `
      SELECT * FROM gigs
      WHERE  freelancer=?
      and app_id=?
    `;

    HandleDatabase([freeLancer, appId], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('No freeLancer by that username found');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * GET all gigs based on customer username and
  * headers.app_id
  */
  public getCustomer(req: Request, res: Response, next: NextFunction) {
    const customer: string = req.params.customer;
    const appId: string = req.headers.app_id;

    const queryStr = `
      SELECT * FROM gigs
      WHERE customer = ?
      and app_id=?
    `;

    HandleDatabase([customer, appId], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('No customer by that username found');
        return;
      } else {
        res.json(data);
      }
    });
  }

  /**
  * POST a new gig app_id is included in body
  */
  public addOne(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      INSERT INTO gigs (app_id, freelancer, customer, price, complete, final_price,
      freelancer_rating, customer_rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      app_id=VALUES(app_id),
      freelancer=VALUES(freelancer),
      customer=VALUES(customer),
      price=VALUES(price),
      complete=VALUES(complete),
      final_price=VALUES(final_price),
      freelancer_rating=VALUES(freelancer_rating),
      customer_rating=VALUES(customer_rating)
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
  * attach each handler to the appropriate end point
  */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/freelancer/:freelancer', this.getFreelancer);
    this.router.get('/customer/:customer', this.getCustomer);
    this.router.post('/', this.addOne);
  }
}

const gigRoutes = new GigsRouter();
gigRoutes.init();

export default gigRoutes.router;
