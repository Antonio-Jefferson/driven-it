import {
  mockTicketTypeNotPaid,
  mockTicketTypeNotIncludesHotel,
  mockTicketType,
  mockBookingRooidReturn,
  mockRoomReturn,
  createBookingReturn,
  mockRoomCapacityReturn,
  mockRoomAllReturn,
  mockBookingIdReturn,
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

describe('findBookings function', () => {
  it('should respond not found if bookings not exist', async () => {
    const userId = 1;

    jest.spyOn(bookingRepository, 'findBooking').mockResolvedValue(null);

    expect(bookingService.findBookings(userId)).rejects.toEqual(notFoundError());
  });
  it('should respond with Room', async () => {
    const userId = 1;
    const room = await mockRoomAllReturn();

    jest.spyOn(bookingRepository, 'findBooking').mockResolvedValue(room);
    const resultRomm = await bookingService.findBookings(userId);

    expect(resultRomm).toEqual(room);
  });
});

describe('updateBooking function', () => {
  it('should erro if booking not exist', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(null);

    expect(bookingService.updateBooking(userId, bookingId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should erro if booking !== userId', async () => {
    const userId = 2;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());

    expect(bookingService.updateBooking(userId, bookingId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond not found when bookingId not exist', () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(null);

    expect(bookingService.updateBooking(userId, bookingId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond not found when roomId not exist', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(null);

    expect(bookingService.updateBooking(userId, bookingId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond cannot booking error', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomReturn());

    expect(bookingService.updateBooking(userId, bookingId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond booking updated', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;
    const createBooking = await createBookingReturn();

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByBookingRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomCapacityReturn());
    jest.spyOn(bookingRepository, 'updateBooking').mockResolvedValue(createBooking);

    const resultBooking = await bookingService.updateBooking(userId, bookingId, roomId);
    expect(resultBooking).toEqual(createBooking);
  });
});
