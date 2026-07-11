import "dotenv/config";
import path from "path";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from "./index";

async function migrateDB() {
  try {
    console.log("Running database migrations...");

    await migrate(db, {
      migrationsFolder: path.resolve(__dirname, "../../drizzle"),
    });

    await connection.end();

    console.log("Database migrated successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);

    await connection.end();
    process.exit(1);
  }
}

migrateDB();
