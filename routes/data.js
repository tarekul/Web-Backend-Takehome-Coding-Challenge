const express = require("express");
const app = express();

const raffleService = require("../services/raffle");

app.get("/", (req, res) => {
  const emailProviders = {};
  raffleService.readUsers().then((response) => {
    response.forEach((r) => {
      let email = r.email;
      const dotIdx = email.indexOf("@");
      email = email.slice(dotIdx + 1);

      emailProviders[email] = emailProviders[email]
        ? emailProviders[email] + 1
        : 1;
    });

    let emailsArr = Object.entries(emailProviders);
    emailsArr = emailsArr.sort((a, b) => b[1] - a[1]).map((sub) => sub[0]);
    res.send(emailsArr.slice(0, 4));
  });
});

module.exports = {
  dataApp: app,
};
