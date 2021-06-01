const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/raffledb");

module.exports = { db };
