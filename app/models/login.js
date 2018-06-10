export default {
  namespace: 'login',
  state: {
    username: '',
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {

  },
}
