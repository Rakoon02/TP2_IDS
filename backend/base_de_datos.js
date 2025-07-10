const {Pool} = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'database',
	database: 'multiversus',
	password: 'postgres',
	port: 5432,
});

module.exports = pool;
