import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'services/axios';
import * as exampleActions from 'store/modules/example/actions';

export default function HomePage() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getStudents = async () => {
      const response = await axios.get('/students');
      const { data } = response;
      if (data) console.log(data);
    };
    getStudents();
  }, []);

  const activateReducerAction = () => {
    dispatch(exampleActions.clicaBotaoRequest());
  };

  return (
    <>
      <Typography variant="h1">Bem vindo</Typography>
      <Button variant="contained" onClick={activateReducerAction}>
        Clique aqui para ativar o visitante
      </Button>
    </>
  );
}
