import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const demo = mysqlTable("demo", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Demo = typeof demo.$inferSelect;
export type NewDemo = typeof demo.$inferInsert;
