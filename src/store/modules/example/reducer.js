import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function ReducerExample(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('sucesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case types.BOTAO_CLICADO_FAILURE: {
      console.log('erro');
      return state;
    }
    case types.BOTAO_CLICADO_REQUEST: {
      console.log('fazendo a requisicao');
      return state;
    }
    default: {
      return state;
    }
  }
}
