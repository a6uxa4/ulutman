import React from 'react'
import { styled, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Modal from '../../../components/UI/Modal'
import CloseIcon from '../../../assets/icons/cross-icon.svg?react'
import Input from '../../../components/UI/Input'
import { Button } from '../../../components/UI/Button'
import { createSignUpSchema } from '../../../utils/general/validation/authValidation'
import { signUp } from '../../../redux/auth/authThunk'
import Spinner from '../../../components/UI/Spinner'
import GoogleAuth from './GoogleAuth'

const signUpInputs = [
   {
      label: 'signUp.name',
      value: 'name',
      type: 'text',
   },
   {
      label: 'signUp.email',
      value: 'email',
      type: 'email',
   },
   {
      label: 'signUp.password',
      value: 'password',
      type: 'password',
   },
   {
      label: 'signUp.confirmPassword',
      value: 'confirmPassword',
      type: 'password',
   },
]

const SignUp = ({ open, onClose, openSignIn }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)
   const { t } = useTranslation()

   const signUpSchema = createSignUpSchema(t)

   const handleOpenSignInModal = () => {
      onClose()
      openSignIn()
   }

   const submitHandler = val => {
      dispatch(signUp({ val, handleOpenSignInModal, t }))
   }

   const { values, handleChange, handleSubmit, errors, touched } = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
      validationSchema: signUpSchema,
      onSubmit: values => {
         submitHandler(values)
      },
   })

   return (
      <Modal open={open} handleClose={onClose}>
         <IconStyle>
            <CloseIcon onClick={onClose} />
         </IconStyle>
         <Box onSubmit={handleSubmit}>
            <h2>{t('signUp.title')}</h2>
            {signUpInputs.map(item => (
               <div key={item.value} style={{ position: 'relative' }}>
                  <Input
                     placeholder={t(item.label)}
                     onChange={handleChange}
                     name={item.value}
                     id={item.value}
                     type={item.type}
                     value={values[item.value]}
                  />
                  {errors[item.value] && touched[item.value] && (
                     <ErrorText
                        style={{
                           position: 'absolute',
                           left: '0px',
                           // top: '0px',
                        }}
                     >
                        {errors[item.value]}
                     </ErrorText>
                  )}
               </div>
            ))}
            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">{t('signUp.title')}</Button>
            )}
            {/* <GoogleAuth /> */}

            <Typography display="flex" gap={1}>
               {t('signUp.account')}
               <NavLink to="" onClick={handleOpenSignInModal}>
                  {t('signUp.enter')}
               </NavLink>
            </Typography>
         </Box>
      </Modal>
   )
}

export default SignUp

const Box = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   h2: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '26px',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
}))

const IconStyle = styled('div')(() => ({
   svg: {
      position: 'absolute',
      top: '26px',
      right: '26px',
      cursor: 'pointer',
   },
}))

const ErrorText = styled('p')({
   color: 'red',
   fontSize: '12px',
})
