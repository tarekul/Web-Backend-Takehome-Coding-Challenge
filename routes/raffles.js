const express = require("express");
const app = express();

//db services
const raffleService = require("../services/raffle");

const { isEmpty, emailValidator, phoneValidator } = require("../validator");

app.get("/", (req, res) => {
  const { active } = req.query;
  if (active === "true")
    raffleService.readInactiveRaffles().then((response) => res.json(response));
  else if (active === "false") {
    raffleService.readActiveRaffles().then((response) => res.json(response));
  } else raffleService.readRaffles().then((response) => res.json(response));
});

app.post("/", (req, res) => {
  const { name, secret_token } = req.body;
  const created_at = new Date();

  raffleService
    .createRaffle(name, secret_token, created_at)
    .then(() => res.send("New raffle created success"))
    .catch((err) => res.send(err.toString()));
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  raffleService
    .readRaffle(id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err.toString()));
});

app.get("/:id/participants", (req, res) => {
  const { id } = req.params;
  const { email } = req.query;

  raffleService.readParticipants(id).then((response) => {
    if (email) {
      const filterEmail = response.filter((p) =>
        p.email === email ? true : false
      );
      res.json(filterEmail);
    } else res.json(response);
  });
});

app.post("/participants", (req, res) => {
  const { firstname, lastname, email, phone, raffles } = req.body;
  if (!Array.isArray(raffles))
    res.status(400).json({ error: "raffle ids must be array" });

  if (!isEmpty(firstname) || !isEmpty(lastname) || !isEmpty(email))
    return res
      .status(400)
      .json({ error: "body must incude firstname, lastname, and email" });

  if (!emailValidator(email))
    return res.status(400).json({ error: "Incorrectly formatted email" });

  if (phone && !phoneValidator(phone))
    return res
      .status(400)
      .json({ error: "incorrectly formatted phone number" });
  raffleService
    .createParticipant(raffles, firstname, lastname, email, phone, new Date())
    .then(() => res.status(200).json({ message: "Success" }))
    .catch((err) => res.status(500).json(err.toString()));
});

app.put("/:id/winner", (req, res) => {
  const { id } = req.params;
  const { secret_token } = req.body;

  raffleService
    .readRaffle(id)
    .then((response) => {
      if (response.winner_id && response.secret_token === secret_token) {
        return raffleService
          .readParticipant(response.winner_id)
          .then((winner) => res.status(400).json(winner));
      } else if (response.secret_token !== secret_token)
        return res
          .status(400)
          .json({ error: "secret token does not match with raffle id" });
      else {
        raffleService.readParticipants(id).then((participants) => {
          if (participants.length > 0) {
            const length = participants.length;
            const randomIdx = Math.floor(Math.random() * length);
            raffleService.updateRaffleWinner(id, participants[randomIdx].id);
            return res.status(200).json(participants[randomIdx]);
          } else return res.status(500).json({ error: "No Participants" });
        });
      }
    })
    .catch((err) => res.json(err.message.toString()));
});

//bonus
app.get("/:id/winner", (req, res) => {
  const { id } = req.params;
  raffleService
    .readWinner(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err.message.toString()));
});

module.exports = {
  raffleApp: app,
};
