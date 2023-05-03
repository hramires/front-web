import * as eventApi from '@api/event';

export const actions = {
  async createEvent(context, { params }) {
    const event = await eventeApi.createEvent(params);
    return event.data ? event.data : null;
  },
  async updateEvent(context, { id, params }) {
    const event = await eventApi.updateEvent(id, params);
    return event.data ? event.data : null;
  },
  async deleteEvent(context, { eventId }) {
    await eventApi.deleteEvent(eventId);
  },
  async fetchAllEvents() {
    const events = await eventApi.getAllEvents();
    return events.data ? events.data : null;
  },
  async fetchEventById(context, { eventId }) {
    const event = await eventApi.getEventById(eventId);
    return event.data;
  },
};

export default {
  namespaced: true,
  actions,
};
