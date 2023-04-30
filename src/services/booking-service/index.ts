import ticketService from '../tickets-service';
import { cannotBookingError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-respository';

async function createBooking(userId: number, roomId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookingError();
  }

  const bookingRoomId = await bookingRepository.findByBookingRoomId(roomId);
  if (!bookingRoomId) throw notFoundError();

  const roomIdExist = await bookingRepository.roomIdExist(roomId);
  if (!roomIdExist) throw notFoundError();

  if (roomIdExist.capacity <= bookingRoomId.length) {
    throw cannotBookingError();
  }

  return await bookingRepository.createBooking(userId, roomId);
}

async function findBookings(userId: number) {
  const result = await bookingRepository.findBooking(userId);
  if (!result) throw notFoundError();

  return result;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const booking = await bookingRepository.findBookingByUserId(bookingId);

  if (!booking || booking.userId !== userId) {
    throw cannotBookingError();
  }

  const bookingRoomId = await bookingRepository.findByBookingRoomId(roomId);
  if (!bookingRoomId) throw notFoundError();

  const room = await bookingRepository.roomIdExist(roomId);

  if (room.capacity <= bookingRoomId.length) {
    throw cannotBookingError();
  }

  const resultBokking = await bookingRepository.updateBooking(bookingId, roomId);
  console.log({ bookingId: resultBokking.id });
  return resultBokking;
}

const bookingService = {
  createBooking,
  findBookings,
  updateBooking,
};

export default bookingService;
