// config/db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'contacts',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Anjali@123',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

// Test connection
async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

testDBConnection();

module.exports = sequelize;
