const pgp = require("pg-promise")({});
const db = pgp(process.env.DATABASE_URL || "postgres://localhost/raffledb");

module.exports = { db };
