import { useSelector } from 'react-redux'
import { Container, Grid, Typography } from '@mui/material'
import BoardCard from './BoardCard'
import NewBoardCard from './NewBoardCard'

const Home = () => {
  const boards = useSelector(state => state.boards)

  return (
    <main>
      <Typography
        variant='h3'
        align='center'
        component='h1'
        sx={{ mt: 4, mb: 4 }}
      >
        Boards
      </Typography>
      <Container maxWidth='md' sx={{pb: 8}}>
        <Grid container spacing={4} alignItems='center'>
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
          <NewBoardCard />
        </Grid>
      </Container>
    </main>
  )
}

export default Home
