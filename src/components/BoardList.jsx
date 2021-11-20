import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Stack, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import BoardListItem from './BoardListItem'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableText'

const BoardList = ({ listId }) => {
  const { getListById, setListMaxItems } = useListUtil()
  const list = getListById(listId)

  const updateMaxItems = value => {
    const parsedValue = Number(value)
    const newMax = parsedValue < list.items.length ? list.items.length : parsedValue
    setListMaxItems(list, newMax)
  }

  return (
    <Droppable droppableId={list.id} isDropDisabled={list.isDropDisabled}>
      {provided => (
        <ThemeProvider theme={createTheme()}>
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              backgroundColor: theme => theme.palette.grey[100],
              padding: 1,
              margin: 1,
            }}
          >
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='h5' component='h2' fontWeight={500}>
                {list.name}
              </Typography>
              <Box>
                <Typography
                  variant='h5'
                  component='p'
                  fontWeight={500}
                  display='inline'
                >
                  {`${list.items.length}/`}
                </Typography>
                <EditableTypography
                  handleSaveChange={updateMaxItems}
                  textFieldProps={{
                    variant: 'standard',
                    type: 'number',
                    InputProps: { inputProps: { min: list.items.length } },
                  }}
                  typographyProps={{
                    variant: 'h5',
                    component: 'h2',
                    fontWeight: 500,
                    display: 'inline',
                  }}
                >
                  {list.maxItems}
                </EditableTypography>
              </Box>
            </Stack>
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
