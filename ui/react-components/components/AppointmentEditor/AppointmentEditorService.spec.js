import {saveAppointment, saveRecurring} from "./AppointmentEditorService";

jest.mock('../../api/appointmentsApi');
const appointmentsApi = require('../../api/appointmentsApi');
let appointmentsApiSpy;
let recurringAppointmentsApiSpy;


describe('Appointment Editor Service', () => {
    beforeEach(() => {
        appointmentsApiSpy = jest.spyOn(appointmentsApi, 'saveOrUpdateAppointment');
        recurringAppointmentsApiSpy = jest.spyOn(appointmentsApi, 'saveRecurringAppointments');
    });
    afterEach(() => {
        appointmentsApiSpy.mockRestore();
        recurringAppointmentsApiSpy.mockRestore();
    });

    it('should map providers as per payload', async () => {
        const appointment = {
            providers: [
                {
                    label: 'name1',
                    value: 'uuid1'
                },
                {
                    label: 'name2',
                    value: 'uuid2'
                }
            ]
        };
        const updatedAppointment = {
            providers: [
                {
                    name: 'name1',
                    uuid: 'uuid1'
                },
                {
                    name: 'name2',
                    uuid: 'uuid2'
                }
            ]
        };

        await saveAppointment(appointment);

        expect(appointmentsApiSpy).toHaveBeenCalledWith(updatedAppointment)
    });

    it('should return the response returned from saveOrUpdate Appointment', async () => {
        const appointment = {
            providers: [
                {
                    label: 'name1',
                    value: 'uuid1'
                },
                {
                    label: 'name2',
                    value: 'uuid2'
                }
            ]
        };

        const expectedResponse = {};
        appointmentsApiSpy.mockImplementation(() => expectedResponse);

        const response = await saveAppointment(appointment);

        expect(response).toEqual(expectedResponse);
    });

    it('should map providers as per payload for recurringAppointments', async () => {
        const recurringRequest = {
            appointmentRequest: {
                providers: [
                    {
                        label: 'name1',
                        value: 'uuid1'
                    },
                    {
                        label: 'name2',
                        value: 'uuid2'
                    }
                ]
            }
        };
        const updatedRecurringRequest = {
            appointmentRequest: {
                providers: [
                    {
                        name: 'name1',
                        uuid: 'uuid1'
                    },
                    {
                        name: 'name2',
                        uuid: 'uuid2'
                    }
                ]
            }
        };

        await saveRecurring(recurringRequest);

        expect(recurringAppointmentsApiSpy).toHaveBeenCalledWith(updatedRecurringRequest)
    });
});
