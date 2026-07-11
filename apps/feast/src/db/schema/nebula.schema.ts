import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";

export const nebula = mysqlTable("nebula", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Nebula = typeof nebula.$inferSelect;
export type NewNebula = typeof nebula.$inferInsert;
