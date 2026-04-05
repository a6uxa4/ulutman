import { CardMedia, styled, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SumIcon from '../../assets/icons/sum-icon.svg?react'
import Geolocation from '../../assets/icons/geolocation-icon.svg?react'

import GrayHeart from '../../assets/icons/gray-heart-icon.svg?react'
import Call from '../../assets/icons/phone-icon.svg?react'
import emptyImageCard from '../../assets/images/no-image.jpg'
import NoData from '../../assets/icons/empty-data.svg?react'

import { IconButton } from '../IconButton'
import Modal from './Modal'
import { PhoneNumberSingle, TitlePhone, WrapperPhone } from './Card/CardItem'
import { PATHS } from '../../utils/constants/paths'
import { useTranslation } from 'react-i18next'

export const CategoryCard = ({ categories = [], handleToggleFavorite }) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const [phoneModal, setPhoneModal] = useState('')
   const navigate = useNavigate()
   const { t } = useTranslation()

   const handleNavigateDetail = id => {
      navigate(PATHS.USER.DETAILS.replace(':id', id))
   }

   const handleOpen = id => setPhoneModal(id)

   const handleClose = () => setPhoneModal('')

   return !categories || categories.length === 0 ? (
      <NoDataContainer>
         <NoData />
      </NoDataContainer>
   ) : (
      categories.map(item => (
         <Container key={item.id}>
            {isMobile ? (
               <Block>
                  <ImageStyle
                     image={item.images[0] || emptyImageCard}
                     title={item.title}
                     onClick={() => handleNavigateDetail(item.id)}
                  />
                  <div>
                     <FirstBlock>
                        <Price>
                           {item.price} <SumIcon />
                        </Price>
                        <IconButton onClick={() => handleToggleFavorite(item)}>
                           {/* <GrayHeart
                              className={item.detailFavorite ? 'like-red' : ''}
                           /> */}
                        </IconButton>
                     </FirstBlock>
                     <RoomStyle>
                        {item.title}
                        <IconButton onClick={() => handleOpen(item.id)}>
                           <Call />
                        </IconButton>
                     </RoomStyle>
                     <SecondBlock>
                        <Geolocation />
                        <p>
                           {item.metroStation}, {item.address}
                        </p>
                     </SecondBlock>
                     <SecondBlock>{/* <Home /> */}</SecondBlock>
                     <Description>{item.description}</Description>
                  </div>
               </Block>
            ) : (
               <Wrapper>
                  <Block>
                     <ImageStyle
                        image={item.images[0] || emptyImageCard}
                        title={item.title}
                        onClick={() => handleNavigateDetail(item.id)}
                     />
                  </Block>
                  <div>
                     <FirstBlock>
                        <Price>
                           {item.price} <SumIcon />
                        </Price>
                        <div>
                           <IconButton
                              onClick={() => handleToggleFavorite(item)}
                           >
                              <GrayHeart
                                 className={
                                    item.detailFavorite ? 'like-red' : ''
                                 }
                              />
                           </IconButton>
                           <IconButton onClick={() => handleOpen(item.id)}>
                              <Call />
                           </IconButton>
                        </div>
                        <Modal
                           open={item.id === phoneModal}
                           variant="phone"
                           handleClose={handleClose}
                        >
                           <WrapperPhone>
                              <TitlePhone>{t('user.modal.phone')}</TitlePhone>
                              <PhoneNumberSingle>
                                 {item.phoneNumber}
                              </PhoneNumberSingle>
                           </WrapperPhone>
                        </Modal>
                     </FirstBlock>
                     <RoomStyle>{item.title} </RoomStyle>
                     <SecondBlock>
                        <Geolocation />
                        <p>
                           {item.metroStation}, {item.address}
                        </p>
                     </SecondBlock>
                     <SecondBlock>{/* <Home /> */}</SecondBlock>
                     <Description>{item.description}</Description>
                  </div>
               </Wrapper>
            )}
         </Container>
      ))
   )
}

const ImageStyle = styled(CardMedia)(({ theme }) => ({
   width: '275px',
   height: '222px',
   borderRadius: '8px',
   position: 'relative',
   top: '20px',
   left: '20px',
   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '169px',
      top: '0px',
      left: '0px',
   },
}))
const Block = styled('div')(({ theme }) => ({
   width: '315px',
   height: '262px',
   borderRadius: '10px',
   background: '#fff',
   [theme.breakpoints.down('md')]: {
      width: '325px',
      height: '331px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },
}))
const Container = styled('div')(({ theme }) => ({
   height: '262px',
   cursor: 'pointer',
   [theme.breakpoints.down('md')]: {
      height: '331px',
   },
}))
const Price = styled('p')(({ theme }) => ({
   fontSize: '24px',
   fontWeight: '600',
   paddingBottom: '10px',
   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
      paddingBottom: '0px',
   },
}))
const RoomStyle = styled('p')(({ theme }) => ({
   fontSize: '18px',
   fontWeight: '500',
   paddingBottom: '10px',
   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '0px',
   },
}))
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   paddingTop: '6px',
   gap: '4px',
   p: {
      fontSize: '14px',
      fontWeight: '400',
   },
}))
const Description = styled('p')(({ theme }) => ({
   width: '650px',
   fontSize: '18px',
   fontWeight: '400',
   paddingTop: '24px',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))
const Wrapper = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}))
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   '.like-red path, .message-red path': {
      fill: 'red',
   },
   div: {
      display: 'flex',
      alignItems: 'center',
   },
}))

const NoDataContainer = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',

   svg: {
      width: '40%',
   },
}))
