const express = require('express');
const summonerRouter = require('./routes/searchRoutes');
const usersRouter = require('./routes/userRoutes');
const leaguesRouter = require('./routes/leaguesRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { Kayn, REGIONS, DDragon, Summoner } = require('kayn');
const kayn = Kayn(process.env.API_KEY);
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var bodyParser = require('body-parser');

const app = express();

//Get database URL and pass password into the URl
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//Connect to the MongoDB passing in some connection options
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Database...'))
  .catch((err) => {
    console.log(err);
  });

// Set up Auth0 configuration
const authConfig = {
  domain: 'lol-stat.eu.auth0.com',
  audience: '/profile',
  clientId: '2ymZyMoDjB8G95O82zUE63018YLYx1yd',
};

// Define middleware that validates incoming bearer tokens
// using JWKS from lol-stat.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256'],
});

//Import Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded());

//Import Routes
app.use('/api/v1/', summonerRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/', leaguesRouter);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port 3000');
});

console.log(process.env.API_KEY);

module.exports = app;
