import { call, put, all, takeLatest } from 'redux-saga/effects';
import axios from 'services/axios';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';

function* loginRequest({ payload }) {
  try {
    // const { email, password } = payload;
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Logado com sucesso!');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    window.location.replace(payload.prevPath);
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    errors.map((error) => toast.error(error));
    yield put(actions.loginFailure());
  }
}

function persistRehytrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { inputName: nome, inputEmail: email, inputPass: password } = payload;
  try {
    yield call(axios.post, '/users', {
      nome,
      email,
      password: password || undefined,
    });
    toast.success('Conta criada com sucesso');
    yield put(actions.registerSuccess({ nome, email, password }));
    window.location.replace('/login');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    errors.map((error) => toast.error(error));
  }
}

function* registerUpdate({ payload }) {
  const {
    id,
    inputName: nome,
    inputEmail: email,
    inputPass: password,
  } = payload;
  try {
    if (!id) return;
    yield call(axios.put, '/users', {
      nome,
      email,
      password: password || undefined,
    });
    toast.success('Cadastro atualizado  com sucesso');
    yield put(actions.registerUpdateSuccess({ nome, email, password }));
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);
    errors.map((error) => toast.error(error));

    if (status === 401) {
      toast.error(
        'Seu token expirou devido a mudança no seu e-mail, por favor efetue login novamente'
      );
      yield put(actions.loginFailure());

      setTimeout(() => {
        window.location.replace('/login');
      }, 3000);
    }
    yield put(actions.registerUpdateFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehytrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.REGISTER_UPDATE_REQUEST, registerUpdate),
]);
