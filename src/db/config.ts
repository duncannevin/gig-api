let Importer = require('node-mysql-importer');
Importer.config({
  host: 'localhost',
  user: 'root',
  password: '',
  debug: false,
});

export class SchemaConfig {
  constructor() {}

  importSchema(cb): void {
    Importer.importSQL('./src/db/schema.sql')
      .then(success => {
        console.log('SCHEMA SUCCESS');
        if (cb !== undefined) {
          cb();
        }
      })
      .catch(err => console.log('SCHEMA FAILED', err));
  }
}

const schemaConfig = new SchemaConfig();
export default schemaConfig.importSchema;
