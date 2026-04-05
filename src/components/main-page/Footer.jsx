/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import WhatsappIcon from '../../assets/icons/whatsapp-icon.svg?react'

const Footer = () => {
   const { t } = useTranslation()
   const navigate = useNavigate()
   const phoneNumber = '79651518004'
   const message = 'Здравствуйте!'
   const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
   return (
      <WrapperDiv>
         <TitleUlutman>Ulutman</TitleUlutman>

         <ContainerCategory>
            <div onClick={() => navigate('category/WORK')}>
               {t('user.layout.footer.work')}
            </div>
            <div onClick={() => navigate('category/RENT')}>
               {t('user.layout.footer.rent')}
            </div>
            <div onClick={() => navigate('category/HOTEL')}>
               {t('user.layout.footer.hotel')}
            </div>
            <div onClick={() => navigate('category/SERVICES')}>
               {t('user.layout.footer.services')}
            </div>
            <div onClick={() => navigate('category/REAL_ESTATE')}>
               {t('user.layout.footer.real_estate')}
            </div>
            <div onClick={() => navigate('category/AUTO')}>
               {t('user.layout.footer.auto')}
            </div>
            <div onClick={() => navigate('category/SELL')}>
               {t('user.layout.footer.sell')}
            </div>
         </ContainerCategory>
         <NumberContainer>
            <div>
               <CallingIcon />
            </div>
            <NumverTitle>
               <a
                  style={{ color: 'rgb(40, 40, 40)', textDecoration: 'none' }}
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  +7965-151-80-04
               </a>
            </NumverTitle>
         </NumberContainer>
      </WrapperDiv>
   )
}

export default Footer
const WrapperDiv = styled('footer')(({ theme }) => ({
   display: 'flex',
   background: '#fff',
   justifyContent: 'space-around',
   alignItems: 'center',
   width: '100%',
   gap: '80px',
   height: '118px',
   flexWrap: 'wrap',

   [theme.breakpoints.down('md')]: {
      padding: '40px 16px',
      height: 'auto',
      gap: '40px',
      justifyContent: 'flex-start',
      paddingLeft: '10px',
   },
}))
const ContainerCategory = styled('div')(({ theme }) => ({
   display: 'flex',

   justifyContent: 'space-around',
   gap: '18px',
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
   div: {
      cursor: 'pointer',
   },

   [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      gap: '10px',
      display: 'grid',
      gridTemplateColumns: ' 1fr 1fr ',
      columnGap: '160px',
   },
}))

const TitleUlutman = styled('p')(({ theme }) => ({
   display: 'flex',
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '22px',
   fontWeight: '600',
   lineHeight: '27px',
   textTransform: 'uppercase',
   maxWidth: '100%',
   [theme.breakpoints.down('md')]: {
      borderBottom: '1px solid  rgb(217, 217, 217)',
      minWidth: '100%',
      fontSize: '1.125rem',
      lineHeight: '23px',
      justifyContent: 'center',
      paddingBottom: '24px',
   },
}))
const NumberContainer = styled('div')(({ theme }) => ({
   display: 'flex',
   fontFamily: 'Inter',
   fontSize: '1.125rem',
   fontWeight: '400',
   lineHeight: '22px',
   gap: '8px',
   justifyContent: 'flex-start',
   alignItems: 'center',
   '& > div': {
      display: 'flex',
      alignItems: 'center',
   },
   [theme.breakpoints.down('md')]: {
      gap: '4px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
}))
const NumverTitle = styled('div')(({ theme }) => ({
   fontFamily: 'Inter',
   fontSize: '1.125rem',
   fontWeight: '400',
   [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
   },
}))
const CallingIcon = styled(WhatsappIcon)(({ theme }) => ({
   width: '24px',
   height: '24px',
   [theme.breakpoints.down('md')]: {
      width: '1.225rem',
      height: '1.225rem',
   },
   '& a': {
      color: 'rgb(40, 40, 40)',
   },
}))
