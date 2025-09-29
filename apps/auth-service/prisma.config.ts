import { join } from "path";
import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: join("prisma", "schemas", "schema.prisma")
});