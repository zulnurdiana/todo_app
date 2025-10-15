const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

async function setupDatabase() {
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "todo_app",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
  });

  try {
    console.log("🔄 Connecting to PostgreSQL database...");

    await pool.query("SELECT NOW()");
    console.log("✅ Database connection successful");

    const initSqlPath = path.join(__dirname, "database", "init.sql");
    const initSql = fs.readFileSync(initSqlPath, "utf8");

    console.log("🔄 Creating tables...");
    await pool.query(initSql);
    console.log("✅ Tables created successfully");

    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'todos')
    `);

    console.log(
      "📋 Created tables:",
      tablesResult.rows.map((row) => row.table_name)
    );

    console.log("🎉 Database setup completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Make sure your .env file is configured correctly");
    console.log("2. Run: npm install");
    console.log("3. Run: npm start");
    console.log("4. Visit: http://localhost:3000");
  } catch (error) {
    console.error("Database setup failed:", error.message);
    console.log("\nTroubleshooting:");
    console.log("1. Make sure PostgreSQL is running");
    console.log("2. Check your database credentials in .env file");
    console.log("3. Make sure the database exists");
    console.log("4. Check if you have the necessary permissions");
    process.exit(1);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
