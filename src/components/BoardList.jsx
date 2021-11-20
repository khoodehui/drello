import { Box, Stack, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import BoardListItem from './BoardListItem'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableTypography'
import AddItemBlock from './AddItemBlock'

const BoardList = ({ listId }) => {
  const { getListById, renameList, setListMaxItems } = useListUtil()
  const list = getListById(listId)

  const updateListName = value => {
    if (value.length > 0) {
      renameList(list, value)
    }
  }

  const updateMaxItems = value => {
    /*
    don't update if there is no input or input is not a number
    (since type of input field is set to number, non number inputs will return at an empty string)
    */
    if (value.length === 0) return

    const parsedValue = Number(value)
    // new max must be at least the number of items in the list
    const newMax =
      parsedValue < list.items.length ? list.items.length : parsedValue
    setListMaxItems(list, newMax)
  }

  return (
    <Droppable droppableId={list.id} isDropDisabled={list.isDropDisabled}>
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            backgroundColor: theme => theme.palette.grey[100],
            p: 2,
            mb: 4,
          }}
        >
          <Stack direction='row' justifyContent='space-between'>
            <EditableTypography
              handleSaveChange={updateListName}
              typographyProps={{
                variant: 'h5',
                component: 'h2',
                fontWeight: 500,
              }}
            >
              {list.name}
            </EditableTypography>
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
                  InputProps: {
                    inputProps: {
                      min: list.items.length,
                      sx: { width: 50 },
                    },
                  },
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
            <BoardListItem
              key={itemId}
              itemId={itemId}
              index={index}
              list={list}
            />
          ))}
          {provided.placeholder}
          <AddItemBlock list={list} />
        </Box>
      )}
    </Droppable>
  )
}

export default BoardList
