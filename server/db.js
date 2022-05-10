const Pool = require("pg").Pool;

const pool = new Pool({
  user: "wqwrrgnb",
  password: "Ublb8RKAQGa12cYEcaMF2lxeDSG7RtrN",
  host: "manny.db.elephantsql.com",
  port: 5432,
  database: "wqwrrgnb",
});

module.exports = pool;
