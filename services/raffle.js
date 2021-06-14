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
  const participants = [];
  const int_raffle_id = parseInt(raffle_id);
  return raffleService.readUsers().then((users) => {
    users.forEach((user) => {
      console.log(user.raffle_ids.includes(int_raffle_id));
      if (user.raffle_ids.includes(int_raffle_id)) participants.push(user);
    });

    console.log(participants);
    return participants;
  });
};

raffleService.createRaffle = (name, secret_token, created_at) => {
  return db.none(
    "INSERT INTO raffles (name, secret_token, created_at) VALUES (${name}, ${secret_token}, ${created_at})",
    { name, secret_token, created_at }
  );
};

raffleService.createParticipant = (
  raffle_ids,
  firstName,
  lastName,
  email,
  phone,
  registered_at
) => {
  return db.none(
    "INSERT INTO users (raffle_ids, firstName, lastName,email,phone,registered_at) VALUES (${raffle_ids}, ${firstName}, ${lastName}, ${email}, ${phone}, ${registered_at})",
    { raffle_ids, firstName, lastName, email, phone, registered_at }
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
