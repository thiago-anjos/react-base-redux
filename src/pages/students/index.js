import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'services/axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { get } from 'lodash';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid white',
    color: theme.palette.primary.main,
  },
  students: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Students() {
  const props = { color: 'white' };
  const classes = useStyles(props);
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const response = await axios.get('students');
    setStudents(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteStudent = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/students/${id}`).then((response) => {
        setLoading(false);
        toast.success('usuário deletado');
      });
      getData();
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  };

  return (
    <div className={classes.root}>
      <Loading isLoading={loading} />
      <List className={classes.students}>
        {students &&
          students.map((student) => (
            <ListItem key={student.id}>
              <ListItemAvatar>
                <Avatar>
                  {get(student, 'Photos[0].url', false) ? (
                    <img src={student.Photos[0].url} alt="Student Avatar" />
                  ) : (
                    <ImageIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={student.nome} secondary={student.email} />
              <IconButton
                aria-label="edit"
                component={Link}
                to={`/student/${student.id}`}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => deleteStudent(student.id)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default Students;
