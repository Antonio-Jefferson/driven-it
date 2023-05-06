import {
  mockTicketTypeNotPaid,
  mockTicketTypeNotIncludesHotel,
  mockTicketType,
  mockBookingRooidReturn,
  mockRoomReturn,
  createBookingReturn,
  mockRoomCapacityReturn,
} from '../factories';
import { cannotBookingError, notFoundError } from '@/errors';
import bookingService from '@/services/booking-service';
import ticketService from '@/services/tickets-service';
import bookingRepository from '@/repositories/booking-respository';

describe('createBooking function', () => {
  it('ticket not Found', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(null);

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('ticket was not paid', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketTypeNotPaid());

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('ticket does not include hotel and is not in person', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketTypeNotIncludesHotel());

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond not found when bookingId not exist', () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(null);

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond not found when roomId not exist', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(null);

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond cannot booking error', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomReturn());

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond booking created', async () => {
    const userId = 1;
    const roomId = 1;
    const createBooking = await createBookingReturn();

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomCapacityReturn());
    jest.spyOn(bookingRepository, 'createBooking').mockResolvedValue(createBooking);

    const resultBooking = await bookingService.createBooking(userId, roomId);
    expect(resultBooking).toEqual(createBooking);
  });
});
