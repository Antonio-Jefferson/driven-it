import { mockAddressReturn } from '../factories';
import { notFoundError } from '@/errors';
import hotelsService from '@/services/hotels-service';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';

describe('listHotels fucntion', () => {
  it('when not exist enrollament', async () => {
    const userId = 2;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    expect(hotelsService.listHotels(userId)).rejects.toEqual(notFoundError());
  });

  it('when not is Paid', async () => {
    const userId = 1;
    const enrollament = await mockAddressReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollament);
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    expect(hotelsService.listHotels(userId)).rejects.toEqual(cannotListHotelsError());
  });
});
