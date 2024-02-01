require("dotenv").config();
const Twit = require("twit");
const axios = require("axios").default;

const obtenerFraseAleatoria = async () => {
  try {
    const response = await axios.get(process.env.API_AIRTABLE);
    const records = response.data.records;
    const numeroRandom = Math.floor(Math.random() * records.length);
    return records[numeroRandom].fields.tuit;
  } catch (error) {
    throw new Error("Error al obtener la frase aleatoria: " + error.message);
  }
};

const publicarTuit = async () => {
  try {
    const frase = await obtenerFraseAleatoria();
    const client = new Twit({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    const tweet = { status: frase };
    const { data } = await client.post("statuses/update", tweet);
    console.log("Tweet publicado:", data.text);
  } catch (error) {
    console.error("Error al publicar el tuit:", error.message);
  }
};

(async () => {
  await publicarTuit();
})();