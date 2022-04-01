require("dotenv").config();
const Twit = require("twit");
const axios = require("axios").default;

const largoArregloFrases = async () => {
  const response = await axios.get(process.env.API_AIRTABLE);
  const cantidadDeFrasesPosibles = response.data.records.length;
  const randomNumber = (max) => Math.floor(Math.random() * (max - 0 + 1)) + 0;
  return randomNumber(cantidadDeFrasesPosibles);
};

const fraseRandom = async () => {
  const response = await axios.get(process.env.API_AIRTABLE);
  const numeroRandom = await largoArregloFrases();
  const frase = await response.data.records[numeroRandom].fields.tuit;
  return frase;
};

const client = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const postTweet = async () => {
  client.post(
    "statuses/update",
    { status: await fraseRandom() },
    function (err, data, response) {
      if (data) {
        console.log(data);
      } else if (err) {
        console.log(err);
      }
    }
  );
};

postTweet();
setInterval(postTweet, 86400000);
