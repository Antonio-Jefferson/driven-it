import { ApplicationError } from '@/protocols';

export function cannotBookingError(): ApplicationError {
  return {
    name: 'BookingError',
    message: 'Cannot booking this room! Overcapacity!',
  };
}
