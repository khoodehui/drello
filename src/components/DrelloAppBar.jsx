import { AppBar, Toolbar, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router'

const DrelloAppBar = () => {
  const navigate = useNavigate()

  const goHome = () => navigate('/')

  return (
    <AppBar position='relative'>
      <Toolbar>
        <DashboardIcon sx={{mr: 1}}/>
        <Typography onClick={goHome} variant='h6' sx={{cursor: 'pointer'}}>Drello</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default DrelloAppBar
