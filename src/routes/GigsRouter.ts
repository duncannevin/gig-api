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
  * GET gig based on the gig_id
  */
  public getGig(req: Request, res: Response, next: NextFunction) {
    const queryStr: string = `
      SELECT * FROM gigs
      WHERE gig_id=?
      and app_id=?
    `;

    HandleDatabase([req.params.gigid, req.headers.app_id], queryStr, (err, data) => {
      if (err) {
        res.status(404).json('No gig with that id');
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

    let params: any[] = [
      { app_id: req.headers.app_id },
      { gig_id: req.body.gig_id },
      { freelancer: req.body.freelancer },
      { customer: req.body.customer },
      { price: req.body.price },
      { skills: req.body.skills },
      { description: req.body.description },
      { complete: req.body.complete },
      { final_price: req.body.final_price },
      { freelancer_rating: req.body.freelancer_rating },
      { customer_rating: req.body.customer_rating },
    ];

    params = _.filter(params, param => {
      const pVal = _.values(param)[0];
      if (pVal !== undefined) {
        return param
      }
    });

    const queryStr: string = `
      INSERT INTO gigs (${_.map(params, p => _.keys(p)[0]).join(', ')})
      VALUES (${params.map(p => '?').join(', ')})
      ON DUPLICATE KEY UPDATE
      final_price=VALUES(final_price),
      freelancer_rating=VALUES(freelancer_rating),
      customer_rating=VALUES(customer_rating),
      complete=VALUES(complete)
    `;

    HandleDatabase(_.map(params, p => _.values(p)[0]), queryStr, (err, data) => {
      if (err) {
        console.log(err.message);
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        res.json(data);
      }
    });
  }

  public getAvgRating(req: Request, res: Response, next: NextFunction) {

    const strs: Object = {
      all:  `
        SELECT freelancer_rating
        FROM gigs
        WHERE freelancer=?

        UNION ALL

        SELECT customer_rating
        FROM gigs
        WHERE customer=?
      `,
      freelancer: `
        SELECT freelancer_rating
        FROM gigs
        WHERE freelancer=?
      `,
      customer: `
        SELECT customer_rating
        FROM gigs
        WHERE customer=?
      `
    };

    const params: any[] = req.params.whichone === 'all' ? [req.params.username, req.params.username] : [req.params.username];

    HandleDatabase(params, strs[req.params.whichone], (err, data) => {
      if (err) {
        console.log(err.message);
        res.status(404).json('Oops something went wrong');
        return;
      } else {
        let divideBy = 0;
        const avg: number = _.reduce(data, (sum, obj, ind, coll) => {
          const val = _.values(obj)[0];
          if (val > 0) {
            sum += _.values(obj)[0];
            divideBy++;
          }
          return sum;
        }, 0) / divideBy;
        let retObj: Object = {};

        retObj[`${req.params.username} has an avg ${req.params.whichone !== 'all' ? req.params.whichone : 'overall'} rating of`] = avg.toFixed(2);

        res.json(retObj);
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
    this.router.get('/getavgrating/:whichone/:username', this.getAvgRating);
    this.router.get('/getgig/:gigid', this.getGig);
  }
}

const gigRoutes = new GigsRouter();
gigRoutes.init();

export default gigRoutes.router;
