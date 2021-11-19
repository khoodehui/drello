import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import BoardListItem from './BoardListItem'

const BoardList = ({ list }) => {
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
              minHeight: 300,
              // maxWidth: '100vw'
            }}
          >
            <Typography variant='h5' component='h2' fontWeight={500}>
              {list.name}
            </Typography>
            {list.items.map((item, index) => (
              <BoardListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        </ThemeProvider>
      )}
    </Droppable>
  )
}

export default BoardList
