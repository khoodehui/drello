import { useSelector } from 'react-redux'
import { Container, Grid, Typography } from '@mui/material'
import BoardCard from './BoardCard'
import NewBoardCard from './NewBoardCard'

const Home = () => {
  const boards = useSelector(state => state.boards.boards)

  return (
    <main>
      <Typography variant='h3' align='center' component='h1'>
        Home
      </Typography>
      <Container maxWidth='md'>
        <Grid container spacing={4}>
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
