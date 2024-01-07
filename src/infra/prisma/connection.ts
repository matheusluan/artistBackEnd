import { PrismaClient } from "@prisma/client";

export class PrismaConfiguration {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!PrismaConfiguration.instance) {
      PrismaConfiguration.instance = new PrismaClient();
    }

    return PrismaConfiguration.instance;
  }
}

const prisma = PrismaConfiguration.getInstance();

export { prisma };
