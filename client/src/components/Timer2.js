import React, { useState, useEffect } from 'react';
import DrawerAppBar from './Bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PanToolIcon from '@mui/icons-material/PanTool';

const Timer = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [idNumber, setIdNumber] = useState('');
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem('startTime');
    return savedStartTime ? new Date(savedStartTime) : null;
  });
  const [endTime, setEndTime] = useState(() => {
    const savedEndTime = localStorage.getItem('endTime');
    return savedEndTime ? new Date(savedEndTime) : null;
  });
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      fetchSessions();
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('startTime', startTime ? startTime.toISOString() : '');
    localStorage.setItem('endTime', endTime ? endTime.toISOString() : '');
  }, [startTime, endTime]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/addhours`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNumber }),
        credentials: 'include',
      });
      if (response.ok) {
        setLoggedIn(true);
        toast.success('Login successful');
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleStart = () => {
    const now = new Date();
    setStartTime(now);
    setEndTime(null); // Reset end time
  };

  const handleEnd = async () => {
    const now = new Date();
    setEndTime(now);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startTime, endTime: now }),
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Work session logged successfully');
        fetchSessions();
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (err) {
      console.error('Error logging session:', err);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/sessions`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      } else {
        toast.error('Failed to fetch sessions');
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  return (
    <div>
      <DrawerAppBar />
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={400}
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={13}
        padding={3}
        borderRadius={5}
        boxShadow="5px 5px 10px #ccc"
        sx={{
          ':hover': {
            boxShadow: '10px 10px 20px #ccc',
          },
        }}
      >
        {!loggedIn ? (
          <Box display="flex" flexDirection="column">
            <Typography variant="h2" padding={3} textAlign="center">
              Login
            </Typography>
            <TextField
              onChange={(e) => setIdNumber(e.target.value)}
              value={idNumber}
              margin="normal"
              type="text"
              variant="outlined"
              placeholder="Enter your ID number"
            />
            <Button
              onClick={handleLogin}
              endIcon={<LoginIcon />}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="success"
            >
              Login
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            <Typography variant="h2" padding={3} textAlign="center">
              Work Timer
            </Typography>
            {!startTime ? (
              <Button
                onClick={handleStart}
                endIcon={<AccessTimeIcon />}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="contained"
                color="success"
              >
                Start Work
              </Button>
            ) : !endTime ? (
              <Button
                onClick={handleEnd}
                endIcon={<PanToolIcon />}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="contained"
                color="error"
              >
                End Work
              </Button>
            ) : (
              <Typography variant="subtitle1" padding={3} textAlign="center">
                Session completed!
              </Typography>
            )}
            <Typography variant="h6" padding={3} textAlign="center">
              Your Work Sessions
            </Typography>
            <ul>
              {sessions.map((session) => (
                <li key={session._id}>
                  {new Date(session.startTime).toLocaleString()} -{' '}
                  {new Date(session.endTime).toLocaleString()}
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Timer;
