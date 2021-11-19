import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Button, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import BoardListItem from './BoardListItem'
import useListUtil from '../hooks/useListUtil'

const BoardList = ({ listId }) => {
  const { getListById } = useListUtil()
  const list = getListById(listId)

  return (
    <Droppable droppableId={list.id}>
      {provided => (
        <ThemeProvider theme={createTheme()}>
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              backgroundColor: theme => theme.palette.grey[100],
              padding: 1,
              margin: 1,
              // minHeight: 300,
              // maxWidth: '100vw'
            }}
          >
            <Typography variant='h5' component='h2' fontWeight={500}>
              {list.name}
            </Typography>
            {list.items.map((itemId, index) => (
              <BoardListItem key={itemId} itemId={itemId} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        </ThemeProvider>
      )}
    </Droppable>
  )
}

export default BoardList
