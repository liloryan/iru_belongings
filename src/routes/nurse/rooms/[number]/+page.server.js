import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// fxn loads item info from database when page is opened
export async function load({ params }){
  const items = prisma.items.findMany({
    where: {
      room: {
        number: Number(params.number)
        }
      }
    })
  return {
    items:items,
    number:params.number
  }
}