import { createAction, NavigationActions, Storage,Request } from '../utils'
import * as authService from '../services/auth'
// import request from '../utils/request'
export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
    username:'',
    password:''
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false)
      yield put(createAction('updateState')({ login, loading: false }))
    },
    *login({ payload }, { call, put ,select}) {
      yield put(createAction('updateState')({ fetching: true }))
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          })
        )
      }
      console.log(payload)
      yield select(state=>console.log(state))

      Request('https://hub.gomrwind.com/product/2')
        .then(e=>{
          console.log(e)
        }   )
      yield put(createAction('updateState')({ login, fetching: false }))
      Storage.set('login', login)
    },
    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))

    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
