const dotenv = require("dotenv");
dotenv.config();

async function fetchGameDetails(gameId) {
  try {
    const response = await fetch("https://api.igdb.com/v4/games/", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: `fields *; where id = (${gameId});`,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to propagate it
  }
}

module.exports = {
  fetchGameDetails,
};
