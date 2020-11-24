import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import useLogin from 'services/isLoggedIn';
import * as actions from 'store/modules/auth/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const isLogin = useLogin();
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Alunos" />
        </ListItem>
        <ListItem button component={Link} to="/student">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Criar Aluno" />
        </ListItem>
        <ListItem button component={Link} to="/register">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={isLogin ? 'Editar Dados' : 'Criar conta'} />
        </ListItem>
        {isLogin && (
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer('left', true)}
        variant="outlined"
        color="primary"
        className={classes.button}
      >
        <Menu />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </>
  );
}
