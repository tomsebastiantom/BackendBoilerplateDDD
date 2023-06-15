import path from 'path';
require('dotenv').config();
import { exec } from 'child_process';
import fs from 'fs';

class PrismaMigrationService {
  private schemaPath: string;

  constructor(private tenantId: string) {
    this.schemaPath = `./prisma/schema.prisma`;
  }

  removeHyphens(tenantId: string) {
    return tenantId.replace(/-/g, '');
  }

  updateSchemaAndMigrate = async (dbUrl?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Construct the database URL
      if (!dbUrl) {
        const { BASE_DATABASE_URL } = process.env;
        dbUrl = `${BASE_DATABASE_URL}_${this.removeHyphens(
          this.tenantId
        )}?schema=public`;
      }

      // Read the schema.prisma file
      let schema = fs.readFileSync(this.schemaPath, 'utf8');

      // Replace the DATABASE_URL placeholder with the actual DB URL
      const dataSourceRegex = /datasource db {[\s\S]*?}/;
      const dataSourceReplacement = `datasource db {
  provider = "postgresql"
  url      = "${dbUrl}"
}`;
      schema = schema.replace(dataSourceRegex, dataSourceReplacement);

      // Write the updated schema.prisma file back
      fs.writeFileSync(this.schemaPath, schema);

      // Run the Prisma Migrate command
      exec('npx prisma db push', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          reject(error);
        } else {
          if (stdout) {
            console.log(`stdout: ${stdout}`);
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
          }
          resolve();
        }
      });
    });
  };
}
export { PrismaMigrationService };
// Usage:
// (async () => {
//     const prismaMigrationService = new PrismaMigrationService('myTenantId');
//     try {
//         await prismaMigrationService.updateSchemaAndMigrate();
//         console.log('Migration successful');
//     } catch (error) {
//         console.error('Migration failed', error);
//     }
// })();
