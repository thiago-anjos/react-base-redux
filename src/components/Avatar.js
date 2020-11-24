import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { EditRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function ImageAvatars({ urlImage, id, edit }) {
  const classes = useStyles();
  const history = useHistory();

  const editPhoto = (value) => {
    if (!value) return;
    history.push(`/student/photo/${id}`);
  };

  return (
    <>
      {id && (
        <div className={classes.root}>
          <Avatar alt="Remy Sharp" src={urlImage} className={classes.large} />
          {edit && (
            <IconButton aria-label="delete" onClick={() => editPhoto(id)}>
              <EditRounded />
            </IconButton>
          )}
        </div>
      )}
    </>
  );
}

ImageAvatars.defaultProps = { urlImage: '', id: '', edit: false };
ImageAvatars.propTypes = {
  urlImage: PropTypes.string,
  id: PropTypes.string,
  edit: PropTypes.bool,
};

export default ImageAvatars;
