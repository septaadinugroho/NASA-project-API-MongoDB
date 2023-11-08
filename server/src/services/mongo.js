const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://septaa811:wI2I79KQlycPPY0A@nasacluster.swi21ew.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
