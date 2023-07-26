import { PrismaClient } from '@prisma/client'
import { isTemplateExpression } from 'typescript';
const prisma = new PrismaClient()
// fxn loads item info from database when page is opened
export async function load({ params }) {
  const items = prisma.items.findMany({
    where: {
      room: {
        number: Number(params.number)
      }
    }
  })
  return {
    items: items,
    number: params.number
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    const room = await prisma.room.findFirst({
      where: {
        number: Number(data.get('roomNumber'))
      }
    })
    if (room) {
      await prisma.items.create({
        data: {
          name: data.get('itemName'),
          room: {
            connect: {
              id: room.id
            }
          }
        }
      })
    }
  }
  ,
  remove: async ({ cookies, request }) => {
    const data = await request.formData();
    await prisma.items.update({
      where:{
        id:Number(data.get('id'))
      },
      data:{
        deleted:true
      }
  })
  },
  check: async ({ cookies, request }) => {
    const data = await request.formData();
    await prisma.items.update({
      where:{
        id:Number(data.get('id'))
      },
      data:{
        checked:true
      }
    })  
  }
};