import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', findBooking).post('/', createBooking).put('/', updateBooking);

export { bookingRouter };
