import * as mysql from 'mysql';
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gig_app',
  debug: false,
  multipleStatements: true,
});


export class HandleDatabase {

  constructor() {}

  private sendErr(err: Object): Object {
     return {'code': 100, 'status': 'Error connection to database', 'message': err};
  }

  public query = (params: [string], queryStr: string, cb: any): void => {

    pool.getConnection((err, connection) => {
     if (err) {
       cb(this.sendErr(err.message), null);
       return;
     }

     connection.query(queryStr, params, (err, data) => {
       if (err) {
         cb(this.sendErr(err.message), null);
         return;
       } else {
         cb(null, data);
       }
       connection.release();
     });

     connection.on('error', (err, res) => {
       cb(this.sendErr(err.message), null);
       return;
     });
   });
  }
}

let handleDatabase = new HandleDatabase();
export default handleDatabase.query;
