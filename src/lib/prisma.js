// hack to get prisma working from: https://github.com/prisma/prisma/issues/15614#issuecomment-1491269798
import { createRequire } from 'module' ;
    
const require = createRequire(import.meta.url);
    
const { PrismaClient: RequiredPrismaClient } = require('@prisma/client');
    
const _PrismaClient = RequiredPrismaClient;
    
export class PrismaClient extends _PrismaClient {}