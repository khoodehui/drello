import { TextField, Typography } from '@mui/material'
import { useState } from 'react'

const EditableTypography = ({
  handleSaveChange,
  textFieldProps,
  typographyProps,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const handleToggleEdit = () => setIsEditing(true)

  const handleOnFocus = event => {
    event.target.select()
  }

  // allows input to be saved by pressing enter or escape keys
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur()
    }
  }

  // save the change when focus is lost
  const handleOnBlur = event => {
    handleSaveChange(event.target.value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <TextField
        variant='standard'
        autoComplete='off'
        autoFocus
        defaultValue={children}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        {...textFieldProps}
      />
    )
  } else {
    return (
      <Typography
        onClick={handleToggleEdit}
        {...typographyProps}
        sx={{ cursor: 'pointer', ...typographyProps?.sx }}
      >
        {children}
      </Typography>
    )
  }
}

export default EditableTypography
