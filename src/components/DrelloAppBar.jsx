import { AppBar, Toolbar, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'

const DrelloAppBar = () => {
  return (
    <AppBar position='relative'>
      <Toolbar sx={{ cursor: 'pointer' }}>
        <DashboardIcon sx={{ mr: 1 }} />
        <Typography variant='h6'>Drello</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default DrelloAppBar
