import knex from 'knex';

export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './ecommerce.sqlite' },
  useNullAsDefault: true,
});

export const mySQLDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ecommerce',
  },
  pool: { min: 0, max: 7 },
});

sqliteDB.schema.hasTable('products').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA PRODUCTS. VAMOS A CREARLA');
    sqliteDB.schema
      .createTable('products', (table) => {
        table.increments();
        table.timestamp('timestamp').notNullable();
        table.string('nombre').notNullable();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();
        table.string('foto').notNullable();
        table.decimal('precio', 4, 2).notNullable();
        table.integer('stock').notNullable();
      })
      .then(() => {
        console.log('SqLite DONE');
      });
  }
});

mySQLDB.schema.hasTable('products').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
    mySQLDB.schema
      .createTable('products', (productosTable) => {
        productosTable.increments();
        productosTable.timestamp('timestamp').notNullable();
        productosTable.string('nombre').notNullable();
        productosTable.string('descripcion').notNullable();
        productosTable.string('codigo').notNullable();
        productosTable.string('foto').notNullable();
        productosTable.decimal('precio', 4, 2).notNullable();
        productosTable.integer('stock').notNullable();
       })
      .then(() => {
        console.log('SQLDB DONE');
      });
  }
});