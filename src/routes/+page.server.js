import { PrismaClient } from '$lib/prisma';
import { fail } from '@sveltejs/kit';

const prisma = new PrismaClient();
// fxn loads item info from database when page is opened
export async function load({ params }) {
	const rooms = await prisma.room.findMany({});
	let updatedRooms = [];
	for (let i = 0; i < rooms.length; i++) {
		const verifiedCount = await prisma.items.count({
			where: {
				deleted: false,
				checked: true,
				room: {
					number: Number(rooms[i].number)
				}
			}
		});
		const unverifiedCount = await prisma.items.count({
			where: {
				deleted: false,
				checked: false,
				room: {
					number: Number(rooms[i].number)
				}
			}
		});
		const deletedCount = await prisma.items.count({
			where: {
				deleted: true,
				room: {
					number: Number(rooms[i].number)
				}
			}
		});
		updatedRooms.push({
			number: rooms[i].number,
			unverified: unverifiedCount,
			verified: verifiedCount,
			deletedCount: deletedCount
		});
	}


	let emptyRooms = await prisma.room.findMany({
		where: {
			items: {
				none: {
					id: {
						gt: -1
					}
				}
			}
		}
	})

	return {
		rooms: updatedRooms,
		emptyRooms: emptyRooms
	};
}
/** @type {import('./$types').Actions} */
export const actions = {
	delItems: async ({ request }) => {
		const data = await request.formData();
		await prisma.items.deleteMany({
			where: {
				room: {
					number: Number(data.get('roomToClear'))
				}
			}
		});
	},
	delRoom: async ({ request }) => {
		const data = await request.formData();
		const delItems = prisma.items.deleteMany({
			where: {
				room: {
					number: Number(data.get('roomToDelete'))
				}
			}
		});
		const delRoom = prisma.room.delete({
			where: {
				number: Number(data.get('roomToDelete'))
			}
		})
		await prisma.$transaction([delItems, delRoom])
	},
	createRoom: async ({ request }) => {
		const data = await request.formData();
		try {
			await prisma.room.create({
				data: {
					number: Number(data.get('roomToCreate'))
				}
			})
		} catch (error) {
			return fail(422, {
				error: 'This room number has already been created.'
			})
		}
	},
	moveRoom: async ({ request }) => {
		const data = await request.formData();

		const destinationRoomNumber = Number(data.get('destinationRoom'))
		const sourceRoomNumber = Number(data.get('roomToMove'))

		const items = await prisma.items.findMany({
			where: {
				room: {
					number: sourceRoomNumber
				}
			}
		})
		for (let i = 0; i < items.length; i++) {
			await prisma.items.update({
				where: {
					id: items[i].id
				},
				data: {
					room: {
						connect: {
							id: destinationRoomNumber
						}
					}
				}
			})
		}
	}	
};
