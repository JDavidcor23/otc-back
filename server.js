const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const cors = require("cors");

require("dotenv").config();

const API_KEY = process.env.API_COINMARKETCAP_KEY;

const BASE_URL = process.env.BASE_URL;

app.use(cors());

app.get("/api/crypto-price/:crypto", async (req, res) => {
  const crypto = req.params.crypto;

  try {
    const response = await axios.get(
      `${BASE_URL}${crypto}&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
          Accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el precio de la criptomoneda" });
  }
});

app.get("/api/crypto-prices", async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}BTC,ETH,SOL&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
          Accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los precios de las criptomonedas" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
