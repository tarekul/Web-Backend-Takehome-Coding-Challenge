const { db } = require("../db/utils.js");

const raffleService = {};

raffleService.readRaffles = () => {
  return db.any("SELECT * FROM raffles");
};

raffleService.readUsers = () => {
  return db.any("SELECT * FROM users");
};

raffleService.readActiveRaffles = () => {
  return db.any("SELECT * FROM raffles WHERE winner_id IS NOT NULL");
};

raffleService.readInactiveRaffles = () => {
  return db.any("SELECT * FROM raffles WHERE winner_id IS NULL");
};

raffleService.readRaffle = (id) => {
  return db.one("SELECT * FROM raffles WHERE id=${id}", { id });
};

raffleService.readParticipant = (id) => {
  return db.one("SELECT * FROM users WHERE id=${id}", { id });
};

raffleService.readParticipants = (raffle_id) => {
  return db.any("SELECT * FROM users WHERE raffle_id=${raffle_id}", {
    raffle_id,
  });
};

raffleService.createRaffle = (name, secret_token, created_at) => {
  return db.none(
    "INSERT INTO raffles (name, secret_token, created_at) VALUES (${name}, ${secret_token}, ${created_at})",
    { name, secret_token, created_at }
  );
};

raffleService.createParticipant = (
  raffle_id,
  firstName,
  lastName,
  email,
  phone,
  registered_at
) => {
  return db.none(
    "INSERT INTO users (raffle_id, firstName, lastName,email,phone,registered_at) VALUES (${raffle_id}, ${firstName}, ${lastName}, ${email}, ${phone}, ${registered_at})",
    { raffle_id, firstName, lastName, email, phone, registered_at }
  );
};

raffleService.updateRaffleWinner = (raffle_id, user_id) => {
  return db.none(
    "UPDATE raffles SET winner_id=${user_id} WHERE id=${raffle_id}",
    { raffle_id, user_id }
  );
};

raffleService.readWinner = (id) => {
  return db.one(
    "SELECT users.* FROM users WHERE id=(SELECT raffles.winner_id FROM raffles WHERE id=${id})",
    { id }
  );
};

module.exports = raffleService;
