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
  const ticket = await ticketService.getTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookingError();
  }

  const result = await bookingRepository.findBooking(userId);
  if (!result) throw notFoundError();

  return result;
}

const bookingService = {
  createBooking,
  findBookings,
};

export default bookingService;
