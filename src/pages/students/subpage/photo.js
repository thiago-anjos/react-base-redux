import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { get } from 'lodash';
import axios from 'services/axios';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Loading from 'components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons({ match }) {
  const classes = useStyles();
  const id = get(match, 'params.id');
  const [avatar, setAvatar] = useState('');
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/students/${id}`);
        setAvatar(get(data, 'Photos[0].url', ''));
      } catch (error) {
        const errors = get(error, 'response.data.errors', []);
        errors.map((message) => toast.error(message));
        toast.info('Você será redirecionado');
        history.push('/');
      }
    };
    getData();
  }, [id, history]);

  const handleChange = async (e) => {
    const photo = e.target.files[0];
    const photoUrl = URL.createObjectURL(photo);
    setAvatar(photoUrl);
    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('fileUpload', photo);

    try {
      setIsloading(true);
      await axios.post('/photos/', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      toast.success('Foto atualizada com sucesso');
      setIsloading(false);
      history.push('/');
    } catch (error) {
      const errors = get(error, 'response.data.errors', []);
      errors.map((message) => toast.error(message));
      setIsloading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Loading isLoading={isLoading} />
      <Avatar urlImage={avatar} />
      <label htmlFor="contained-button-file">
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleChange}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}

UploadButtons.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
