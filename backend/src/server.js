require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/library_db";

connectDB(MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});