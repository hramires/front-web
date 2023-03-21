/* eslint-disable no-shadow */
export const state = {
  viewport: '',
  expandedNavbarBreakpoint: 'lg',
};

export const getters = {
  routeParams(state) {
    return state.route.params;
  },
  routeName(state) {
    return state.route.name;
  },
  route(state) {
    return state.route;
  },
  isMobileView(state) {
    return state.viewport === 'xs' || state.viewport === 'sm';
  },
  isNavbarExpanded(state) {
    return state.viewport === state.expandedNavbarBreakpoint || state.viewport === 'xl';
  },
};
