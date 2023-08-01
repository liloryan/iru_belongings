import { PrismaClient } from '@prisma/client';

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
		updatedRooms.push({
			number: rooms[i].number,
			unverified: unverifiedCount,
			verified: verifiedCount
		});
	}
	return {
		rooms: updatedRooms
	};
}
/** @type {import('./$types').Actions} */
export const actions = {
	delItems: async ({ request }) => {
		const data = await request.formData();
		await prisma.items.deleteMany({
			where: {
				room: {
					number: Number(data.get('roomToDelete'))
				}
			}
		});
	}
};
