import { TextField, Typography } from '@mui/material'
import { useState } from 'react'

const EditableTypography = ({
  handleSaveChange,
  textFieldProps,
  typographyProps,
  children
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleEdit = () => setIsEditing(true)

  // allows input to be saved by pressing enter or escape keys
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur()
    }
  }

  const handleOnBlur = event => {
    handleSaveChange(event.target.value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <TextField
        autoComplete='off'
        autoFocus
        defaultValue={children}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        {...textFieldProps}
      />
    )
  } else {
    return (
      <Typography
        onClick={handleToggleEdit}
        style={{cursor: 'pointer'}}
        {...typographyProps}
      >
        {children}
      </Typography>
    )
  }
}

export default EditableTypography
