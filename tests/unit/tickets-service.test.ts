import { mockAddressReturn, mockTicketByEnrollmentIdReturn, mockTicketTypeReturn } from '../factories';
import ticketsRepository from '@/repositories/tickets-repository';
import ticketService from '@/services/tickets-service';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';

describe('Tickets-Services', () => {
  it('Get ticketTypes', async () => {
    const mockTicketType = await mockTicketTypeReturn();
    jest.spyOn(ticketsRepository, 'findTicketTypes').mockResolvedValue(mockTicketTypeReturn());

    const resultTicketType = await ticketService.getTicketType();

    expect(resultTicketType).toEqual(mockTicketType);
  });

  it('should not found ticket types', async () => {
    jest.spyOn(ticketsRepository, 'findTicketTypes').mockResolvedValue(null);

    await expect(ticketService.getTicketType()).rejects.toEqual(notFoundError());
  });
});

describe('getTicketByUserId function', () => {
  it('should get hotels', async () => {
    const userId = 1;
    const ticket = mockTicketByEnrollmentIdReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(mockAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(ticket);

    const result = await ticketService.getTicketByUserId(userId);

    expect(result).toEqual(ticket);
  });

  it('should not found enrollment', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });

  it('should not found ticket', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(mockAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });
});
