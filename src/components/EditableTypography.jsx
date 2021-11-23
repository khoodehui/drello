import { TextField, Typography } from '@mui/material'
import { useState } from 'react'

const EditableTypography = ({
  inputType,
  typographyVariant,
  typographyComponent,
  fontWeight,
  handleSaveChange,
  otherTextFieldProps,
  otherTypographyProps,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const getTextFieldStyle = theme => {
    const typographyStyle = theme.typography[typographyVariant]
    const fontWeightStyle = fontWeight
      ? theme.typography[
          `fontWeight${
            fontWeight[0].toUpperCase() + fontWeight.slice(1).toLowerCase()
          }`
        ]
      : {}
    return { ...typographyStyle, fontWeight: fontWeightStyle, p: 0 }
  }

  const handleToggleEdit = () => setIsEditing(true)

  const handleOnFocus = event => {
    event.target.select()
  }

  // allows input to be saved by pressing enter or escape keys
  const handleKeyDown = event => {
    if ((event.key === 'Enter' && !event.shiftKey) || event.key === 'Escape') {
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
        size='small'
        type={inputType}
        variant='standard'
        autoComplete='off'
        autoFocus
        defaultValue={children}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        {...otherTextFieldProps}
        InputProps={{
          ...otherTextFieldProps?.InputProps,
          sx: theme => ({
            ...getTextFieldStyle(theme),
            ...otherTextFieldProps?.InputProps?.sx,
          }),
        }}
      />
    )
  } else {
    return (
      <Typography
        display='inline'
        variant={typographyVariant}
        component={typographyComponent}
        fontWeight={fontWeight}
        onClick={handleToggleEdit}
        {...otherTypographyProps}
        sx={{ cursor: 'pointer', ...otherTypographyProps?.sx }}
      >
        {children}
      </Typography>
    )
  }
}

export default EditableTypography
