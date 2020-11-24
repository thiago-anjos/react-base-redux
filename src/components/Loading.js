import { CircularProgress, Container } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: fade(theme.palette.secondary.main, 0.1),
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
}));

function Loading({ isLoading }) {
  const classes = useStyles();

  if (!isLoading) return <></>;
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

Loading.defaultProps = { isLoading: false };
Loading.propTypes = { isLoading: PropTypes.bool };

export default Loading;
