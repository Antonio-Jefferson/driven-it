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

export async function mockBookingRooidReturn() {
  return [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: 'ze da manga',
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];
}

export async function mockRoomReturn() {
  return {
    id: 1,
    name: 'ze da manga',
    capacity: 0,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
export async function mockRoomCapacityReturn() {
  return {
    id: 1,
    name: 'ze da manga',
    capacity: 5,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function createBookingReturn() {
  return {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function mockRoomAllReturn() {
  return {
    id: 1,
    Room: {
      id: 1,
      name: 'ze da manga',
      capacity: 5,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function mockBookingIdReturn() {
  return {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
