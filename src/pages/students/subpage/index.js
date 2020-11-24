import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { get } from 'lodash';
import * as actions from 'store/modules/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Loading';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'services/axios';
import Avatar from 'components/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

function Student({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const history = useHistory();
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [avatar, setAvatar] = useState('');

  const id = get(match, 'params.id', 0);

  useEffect(() => {
    if (!id) return;
    const getData = async ({ idStudent }) => {
      try {
        const { data } = await axios.get(`/students/${idStudent}`);
        setName(data.nome);
        setMiddleName(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);
        const photo = get(data, 'Photos[0].url');
        if (photo) {
          setAvatar(photo);
        }
      } catch (error) {
        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.data.errors', []);
        if (status === 400) {
          errors.map((message) => toast.error(message));
          history.push('/');
        }
      }
    };
    getData({ idStudent: id });
  }, [id, history]);

  const handleFormInfo = async (event) => {
    event.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('name deve ter entre 3 e 255 caracteres');
    }
    if (middleName.length < 3 || middleName.length > 255) {
      formErrors = true;
      toast.error('Sobrenome   deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (!isInt(String(age))) {
      formErrors = true;
      toast.error('Idade inválida');
    }
    if (!isFloat(String(weight))) {
      formErrors = true;
      toast.error('Peso inválido');
    }
    if (!isFloat(String(height))) {
      formErrors = true;
      toast.error('Altura inválida');
    }
    if (formErrors) return;
    try {
      if (id) {
        await axios.put(`/students/${id}`, {
          nome: name,
          sobrenome: middleName,
          email,
          idade: age,
          altura: height,
          peso: weight,
        });
        toast.success('Dados editados com sucesso');
        history.push('/');
      } else {
        await axios.post(`/students/`, {
          nome: name,
          sobrenome: middleName,
          email,
          idade: age,
          altura: height,
          peso: weight,
        });
        toast.success('Aluno criado com sucesso');
        history.push('/');
      }
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const errors = get(error, 'response.data.errors', []);
      if (errors.length > 0) {
        errors.map((message) => toast.error(message));
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <div className={classes.root}>
      <Loading isLoading={isLoading} />
      <Typography variant="h3">
        {id ? 'Editar aluno' : 'Criar novo aluno'}
      </Typography>
      {id ? <Avatar urlImage={avatar} id={id} edit /> : ''}
      <Avatar />
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
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="middleName"
          fullWidth
          label="Sobrename"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <TextField
          required
          id="email"
          fullWidth
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="idade"
          fullWidth
          label="idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          required
          id="peso"
          fullWidth
          label="peso"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          required
          id="altura"
          fullWidth
          label="altura"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
}

export default Student;

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
