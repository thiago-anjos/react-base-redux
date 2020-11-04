import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    color: (props) => props.color,
  },
}));

function Login() {
  const props = { color: 'white' };

  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography>Faça seu login</Typography>
    </div>
  );
}

export default Login;
