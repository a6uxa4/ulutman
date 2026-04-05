import { styled } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Modal from '../UI/Modal'
import { deleteSelectedAds } from '../../redux/users/myAdsThunk'

export const DeleteMyAdsModal = ({ userId, selectedIds }) => {
   const dispatch = useDispatch()
   const errorMessage = useSelector(state => state.myAds.errorMessage)
   const [isOpen, setIsOpen] = useState(true)
   const { t } = useTranslation()

   const handleDeleteSelectedAds = () => {
      if (selectedIds.length > 0) {
         dispatch(deleteSelectedAds({ userId, selectedIds, t }))
      }
      setIsOpen(false)
   }

   const handleCloseModal = () => {
      setIsOpen(!isOpen)
   }
   return (
      <Modal open={isOpen} handleClose={handleCloseModal} variant="delete">
         <Container>
            <Title>{t('user.modal.title')}</Title>
            {errorMessage && <ErrorText>{}</ErrorText>}
            <div>
               <FirstButton onClick={handleCloseModal}>
                  {t('user.modal.cancelBtn')}
               </FirstButton>

               <SecondButton onClick={handleDeleteSelectedAds}>
                  {t('user.modal.deleteBtn')}
               </SecondButton>
            </div>
         </Container>
      </Modal>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
   div: {
      justifyContent: 'center',
      display: 'flex',
      gap: '40px',
   },
}))

const Title = styled('p')(({ theme }) => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#202020',
   textAlign: 'center',

   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
   },
}))
const FirstButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#282828',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: '1px solid #282828',
   background: 'transparent',
   cursor: 'pointer',
}))
const SecondButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#ff0000',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: '1px solid #ff0000',
   background: 'transparent',
   cursor: 'pointer',
}))

const ErrorText = styled('div')({
   marginTop: '10px',
   color: 'red',
   fontSize: '14px',
   textAlign: 'center',
})
