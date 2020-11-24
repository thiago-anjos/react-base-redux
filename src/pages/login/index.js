import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import * as actions from 'store/modules/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Loading';
import isLoggedIn from 'services/isLoggedIn';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

function Login(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);
  const history = useHistory();
  const login = isLoggedIn();

  const handleFormInfo = async (event) => {
    event.preventDefault();
    let formErrors = false;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  useEffect(() => {
    if (!login) return;
    toast.success('Você já está logado');
    history.push('/');
  }, [history, login]);

  return (
    <div className={classes.root}>
      <Loading isLoading={isLoading} />
      <Typography variant="h3">Login</Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleFormInfo}
      >
        <TextField required id="email" fullWidth label="E-mail do usuário" />
        <TextField
          required
          id="password"
          fullWidth
          label="Senha do usuário"
          type="password"
        />
        <Button variant="contained" type="submit">
          Logar
        </Button>
      </form>
    </div>
  );
}

export default Login;
