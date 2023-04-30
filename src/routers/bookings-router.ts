import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, findBookings, updateBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', findBookings)
  .post('/', createBooking)
  .put('/:bookingId', updateBooking);

export { bookingRouter };
