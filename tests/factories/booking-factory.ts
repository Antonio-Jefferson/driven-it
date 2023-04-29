import faker from '@faker-js/faker';
import { prisma } from '@/config';

type Data = {
  hotelId: number;
  capacity: number;
};

export async function createRoom({ hotelId, capacity }: Data) {
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
