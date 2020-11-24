import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/modules/auth/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

function Register() {
  const props = { color: 'white' };
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { id, nome, email } = useSelector((state) => state.auth.user);

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');

  useEffect(() => {
    if (!id) return;
    setInputName(nome);
    setInputEmail(email);
  }, [id, email, nome]);

  const handleFormInfo = async (event) => {
    event.preventDefault();
    let formErrors = false;
    if (
      event.target.elements.name.value.length < 3 ||
      event.target.elements.name.value.length > 255
    ) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(event.target.elements.email.value)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (
      (!id && event.target.elements.password.value.length < 6) ||
      event.target.elements.password.value.length > 50
    ) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }
    if (id) {
      dispatch(
        actions.registerUpdateRequest({ id, inputName, inputEmail, inputPass })
      );
    } else {
      dispatch(actions.registerRequest({ inputName, inputEmail, inputPass }));
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3">
        {id ? 'Editar dados' : 'Crie sua conta'}
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleFormInfo}
      >
        <TextField
          required
          id="name"
          fullWidth
          label="name do usuário"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <TextField
          required
          id="email"
          fullWidth
          label="E-mail do usuário"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <TextField
          required
          id="password"
          fullWidth
          label="Senha do usuário"
          type="password"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
        />
        <Button variant="contained" type="submit">
          {id ? 'Salvar alterações' : ' Criar minha conta'}
        </Button>
      </form>
    </div>
  );
}

export default Register;
