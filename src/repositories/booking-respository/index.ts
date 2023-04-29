import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
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

async function findBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function roomIdExist(roomId: number) {
  return await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

const bookingRepository = {
  createBooking,
  findByBookingRoomId,
  roomIdExist,
  findBooking,
  updateBooking,
};

export default bookingRepository;
