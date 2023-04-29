import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRoom(hotelId: number, capacity: number) {
  return prisma.room.create({
    data: {
      name: faker.name.firstName(),
      capacity: capacity,
      hotelId: hotelId,
    },
  });
}
type Body = {
  userId: number;
  roomId: number;
};
export async function createBooking({ userId, roomId }: Body) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}
