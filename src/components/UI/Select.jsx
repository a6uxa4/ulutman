import React, { forwardRef } from 'react'
import { FormControl, Select, MenuItem, styled } from '@mui/material'
import DownIcon from '../../assets/icons/select-down-icon.svg?react'

const ReusableSelect = forwardRef(
   (
      {
         label,
         options,
         value,
         onChange,
         selectedOption,
         placeholder,
         helperText,
         ...restProps
      },
      ref,
   ) => {
      return (
         <FormControlStyle fullWidth>
            {label && <LabelStyle>{label}</LabelStyle>}
            <SelectStyle
               displayEmpty
               value={value}
               onChange={onChange}
               inputRef={ref}
               IconComponent={DownIcon}
               {...restProps}
               MenuProps={{
                  PaperProps: {
                     sx: {
                        borderRadius: '10px',
                     },
                  },
               }}
               renderValue={selected => {
                  if (!selected) {
                     return <Placeholder>{placeholder}</Placeholder>
                  }
                  const selectedOption = options.find(
                     option => option.value === selected,
                  )
                  return selectedOption ? selectedOption.label : ''
               }}
            >
               {options?.length === 0 ? (
                  <MenuItem disabled>Здесь пока что нету данных.</MenuItem>
               ) : (
                  options.map(option => (
                     <MenuItemStyle
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                     >
                        {option.label}
                     </MenuItemStyle>
                  ))
               )}
            </SelectStyle>
            {helperText && (
               <HelperText error={restProps.error}>{helperText}</HelperText>
            )}
         </FormControlStyle>
      )
   },
)

export default ReusableSelect

const SelectStyle = styled(Select)(() => ({
   '.MuiSelect-select': {
      paddingTop: '8px',
   },
   '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #cfcfcf',
      borderRadius: '10px',
      width: '100%',
      height: '44px',
   },
   '.MuiSelect-icon': {
      right: '10px',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #282828',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #7e52ff',
   },
}))

const LabelStyle = styled('label')(() => ({
   fontWeight: '600',
   fontSize: '18px',
   margin: '0 0 8px 0',
}))

const FormControlStyle = styled(FormControl)(() => ({
   display: 'flex',
}))

const MenuItemStyle = styled(MenuItem)(() => ({
   fontSize: '18px',
   fontWeight: '400',
   '&:hover': {
      background: '#f2eeff',
   },
   '&.Mui-selected': {
      backgroundColor: '#f2eeff',
   },
   '&.Mui-selected:hover': {
      backgroundColor: '#f2eeff',
   },
   '&:focus': {
      backgroundColor: '#f2eeff',
   },
}))

const Placeholder = styled('span')({
   color: '#959595',
})

const HelperText = styled('p')(({ error }) => ({
   margin: '0',

   color: error ? '#FF0000' : '',
}))
