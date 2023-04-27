import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, findBookings } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', findBookings).post('/', createBooking).put('/', updateBooking);

export { bookingRouter };
