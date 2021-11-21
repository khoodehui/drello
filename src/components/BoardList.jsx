import { Box, Stack, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import BoardListItem from './BoardListItem'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableTypography'
import AddItemBlock from './AddItemBlock'

const BoardList = ({ listId, isSrcDroppableSelf }) => {
  const { getListById, renameList, setListMaxItems } = useListUtil()
  const list = getListById(listId)

  /* 
  Dropping for a list is clearly enabled if the number of items in it is less than its item limit.
  However, if a list has max items, we still want to allow items to be dragged and dropped within it.
  Hence if the source list of the dragged item is itself, dropping is enabled for it.
  */
  const isDropDisabled = !(
    isSrcDroppableSelf || list.items.length !== list.maxItems
  )

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
    <Box
      sx={{
        backgroundColor: theme => theme.palette.grey[100],
        display: 'inline-block',
        p: 2,
        ml: 2,
        verticalAlign: 'top',
        width: 300,
        maxWidth: 0.75,
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <EditableTypography
          inputType='text'
          typographyVariant='h5'
          typographyComponent='h2'
          fontWeight='medium'
          handleSaveChange={updateListName}
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
            inputType='number'
            typographyVariant='h5'
            typographyComponent='h2'
            fontWeight='medium'
            handleSaveChange={updateMaxItems}
            otherTextFieldProps={{
              InputProps: {
                inputProps: {
                  min: list.items.length,
                },
                sx: { width: 50 },
              },
            }}
          >
            {list.maxItems}
          </EditableTypography>
        </Box>
      </Stack>
      <Droppable droppableId={list.id} isDropDisabled={isDropDisabled}>
        {provided => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {list.items.map((itemId, index) => (
              <BoardListItem
                key={itemId}
                itemId={itemId}
                index={index}
                list={list}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <AddItemBlock list={list} />
    </Box>
  )
}

export default BoardList
