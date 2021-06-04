# How to run project on local server

To create database in postgres:
  - Turn on postgres server
  - In command line from the db folder run cat ***seed.sql | psql*** , this will populate the database in local server 
  - Open postico application to view live database
  
To run Backend Server:
- Run ***node index.js***

# How to use remote API
Request: GET (get all raffles)
  - https://pursuitraffleapi.herokuapp.com/raffles

Request: POST (post a new raffle)
Body: name, secret_token
 - https://pursuitraffleapi.herokuapp.com/raffles

Request: GET (get one raffle with id)
Params: id
  - https://pursuitraffleapi.herokuapp.com/raffles/2

Request: GET (get all participants of a raffle)
Params: id
  - https://pursuitraffleapi.herokuapp.com/raffles/2/participants

Request: POST (post a new participant of a raffle)
Params: id
Body: firstname, lastname, email, phone(optional)
  - https://pursuitraffleapi.herokuapp.com/raffles/2/participants

Request: PUT (update raffle with a winner)
Params: id
Body: secret_token
  - https://pursuitraffleapi.herokuapp.com/raffles/1/winner

Request: GET (Get winner of a raffle)
Params: id
  - https://pursuitraffleapi.herokuapp.com/raffles/1/winner
