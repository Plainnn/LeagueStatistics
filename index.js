const express = require('express');
const userRouter = require('./routes/searchRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
let leagueAPIKey = 'RGAPI-d80630f9-3643-49da-9e2a-917a4c235dd2';
dotenv.config({ path: './config.env' });

const { Kayn, REGIONS, DDragon, Summoner } = require('kayn');
const kayn = Kayn(process.env.API_KEY);

const app = express();

//Import Middleware
app.use(express.json());
app.use(cors());

//Import Routes
app.use('/api/v1/', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});

console.log(process.env.API_KEY);
