import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByBookingRoomId(roomId: number) {
  return await prisma.booking.findMany({
    where: {
      roomId: roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function roomIdExist(roomId: number) {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const bookingRepository = {
  createBooking,
  findByBookingRoomId,
  roomIdExist,
};

export default bookingRepository;
