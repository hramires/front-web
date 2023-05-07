import * as eventApi from '@api/event';
import {
  ADD_EVENTS,
  DELETE_EVENT,
  SET_EVENT,
  UPDATE_EVENT,
} from '@state/mutation-types';

export const state = {
  events: [],
};

export const getters = {
  getEventById: (state) => (id) => {
    const eventIndex = state.events.findIndex((obj) => obj.id === id);
    return state.events[eventIndex];
  },
  getEvents(state) {
    return state.events;
  },
};

export const mutations = {
  [DELETE_EVENT](state, eventId) {
    const eventIndex = state.events.findIndex((obj) => obj.id === eventId);
    state.events.splice(eventIndex, 1);
  },
  [ADD_EVENTS](state, events) {
    state.events = events;
  },
  [UPDATE_EVENT](state, event) {
    const eventIndex = state.events.findIndex((obj) => obj.id === event.id);
    state.events[eventIndex] = event;
  },
  [SET_EVENT](state, event) {
    const eventIndex = state.events.findIndex((obj) => obj.id === event.id);
    if (!eventIndex) {
      state.events = [
        ...state.events,
        event,
      ];
    }
  },
};

export const actions = {
  async createEvent({ commit }, { params }) {
    const response = await eventApi.createEvent(params);
    const event = response?.data;
    commit(SET_EVENT, event);
    return event;
  },
  async updateEvent({ commit }, { id, params }) {
    const response = await eventApi.updateEvent(id, params);
    const event = response?.data;
    commit(UPDATE_EVENT, event);
    return event;
  },
  async deleteEvent({ commit }, { eventId }) {
    await eventApi.deleteEvent(eventId);
    commit(DELETE_EVENT, eventId);
  },
  async fetchAllEvents({ commit }) {
    const response = await eventApi.getAllEvents();
    const events = response?.data;
    commit(ADD_EVENTS, events);
  },
  async fetchEventById({ commit }, { eventId }) {
    const response = await eventApi.getEventById(eventId);
    const event = response?.data;
    commit(SET_EVENT, event);
    return event;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
