import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const bookings = await bookingService.createBooking(userId, Number(roomId));

    res.status(httpStatus.CREATED).send({
      BookingId: bookings.id,
    });
  } catch (error) {
    next(error);
  }
}
