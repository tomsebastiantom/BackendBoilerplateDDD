import path from 'path';
require('dotenv').config();
import fs from 'fs';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class PrismaMigrationService {
  private schemaPath: string;
  private dataSourceOriginal = `datasource db {
  provider = "postgresql"
  url      = "DATABASE_URL"
}`;
  constructor(private tenantId: string) {
    this.schemaPath = `./prisma/schema.prisma`;
  }

  removeHyphens(tenantId: string) {
    return tenantId.replace(/-/g, '');
  }
  modifySchema = (schemaPath, replacement) => {
    // Read the schema.prisma file
    let schema = fs.readFileSync(schemaPath, 'utf8');

    // Replace the DATABASE_URL placeholder with the given replacement
    const dataSourceRegex = /datasource db {[\s\S]*?}/;
    schema = schema.replace(dataSourceRegex, replacement);

    // Write the updated schema.prisma file back
    fs.writeFileSync(schemaPath, schema);

    return schema;
  };

  updateSchema = (dbUrl, schemaPath) => {
    const dataSourceReplacement = `datasource db {
      provider = "postgresql"
      url      = "${dbUrl}"
    }`;

    return this.modifySchema(schemaPath, dataSourceReplacement);
  };
  updateSchemaAndMigrate = async (dbUrl?: string): Promise<void> => {
    // Construct the database URL
    if (!dbUrl) {
      const { BASE_DATABASE_URL } = process.env;
      dbUrl = `${BASE_DATABASE_URL}_${this.removeHyphens(
        this.tenantId
      )}?schema=public`;
    }

    this.updateSchema(dbUrl, this.schemaPath);

    // Run the Prisma Migrate command
    try {
      const { stdout, stderr } = await exec('npx prisma db push');
      if (stdout) {
        console.log(`stdout: ${stdout}`);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      // revert the schema back to the original state
      this.modifySchema(this.schemaPath, this.dataSourceOriginal);
    } catch (error) {
      console.error(`Error: ${error}`);
      throw error; // re-throw the error so it can be caught and handled outside
    }
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
