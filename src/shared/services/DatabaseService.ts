import { IDatabaseService } from './iDatabaseService';
import { PrismaClient } from '@prisma/client';
import { IAuthService } from '../../modules/users/services/authService';
import { Client } from 'pg';
require('dotenv').config();

const { DATABASE_URL, BASE_DATABASE_URL } = process.env;

export class DatabaseService implements IDatabaseService {
  private clients: Map<string, PrismaClient>;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.clients = new Map();
    this.authService = authService;
  }
  removeHyphens(tenantId: string) {
    return tenantId.replace(/-/g, '');
  } 
  
  async createClient(tenantId: string, dbUrl?: string): Promise<any> {
    if (!dbUrl)
      dbUrl =
        BASE_DATABASE_URL + '_'+ this.removeHyphens(tenantId) + '?schema=public';
    const client = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl
        }
      }
    });
    this.clients.set(tenantId, client);
    return client;
  }
  async getDBclient(tenantId: string): Promise<PrismaClient> {
    const client = this.clients.get(tenantId);
    if (!client) {
      const dbUrl = await this.authService.getTenantDBUrl(tenantId);
      if (!dbUrl) {
        const newClient = await this.createClient(tenantId);
        return newClient;
      }
      const newClient = await this.createClient(tenantId, dbUrl);
      return newClient;
    }
    return client;
  }

  async disconnectClient(tenantId: string): Promise<void> {
    const client = this.clients.get(tenantId);
    if (!client) return;
    await client.$disconnect();
    this.clients.delete(tenantId);
  }
  async cleanUpClients(): Promise<void> {
    const keys = this.clients.keys();
    for (const key of keys) {
      await this.disconnectClient(key);
    }
  }
  static async createClientDatabase(tenantId: string): Promise<any> {
    const client = new Client({
      connectionString: DATABASE_URL
    });
    const DBname = '_'+tenantId.replace(/-/g, '');
 
    await client.connect();
    await client.query(`CREATE DATABASE ${DBname}`);
    await client.end();

    return;
  }
}
