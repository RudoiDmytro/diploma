import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7: connection URL lives here (removed from schema.prisma) and is used
// by the CLI (migrate / studio / db). The runtime client uses the driver
// adapter in src/lib/db.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Read leniently so `prisma generate` (which never connects) works without
    // a live DATABASE_URL; migrate/studio still require it to be set.
    url: process.env.DATABASE_URL ?? "",
  },
});
