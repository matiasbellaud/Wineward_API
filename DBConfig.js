const { Pool } = require('pg');
const itemsPool = new Pool({
    connectionString: "postgres://bellaud_matias:aKrNJKB0rb9QCedJ30ibKcGiTKkFm3fd@dpg-cntglq8l6cac73d62c3g-a.frankfurt-postgres.render.com/wineward_db?sslmode=no-verify",
    idle_timeout: 3000
});
module.exports = itemsPool;