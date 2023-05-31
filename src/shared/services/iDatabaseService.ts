import { PrismaClient } from "@prisma/client";

export interface IDatabaseService {
    getDBclient(tenantId: string): Promise<PrismaClient>;
    disconnectClient(tenantId: string): Promise<void>;
    cleanUpClients(): Promise<void>;
  
}