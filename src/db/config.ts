let Importer = require('node-mysql-importer');
Importer.config({
  host: 'localhost',
  user: 'root',
  password: '',
  debug: false,
});

export class SchemaConfig {
  constructor() {}

  importSchema(): void {
    Importer.importSQL('./src/db/schema.sql')
      .then(success => console.log('SCHEMA SUCCESS'))
      .catch(err => console.log('SCHEMA FAILED', err));
  }
}

const schemaConfig = new SchemaConfig();
export default schemaConfig.importSchema;
