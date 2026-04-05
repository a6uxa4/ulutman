import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigation, Autoplay } from 'swiper/modules'
import { styled } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'

import SliderArrow from '../../assets/icons/slider-arrow.svg?react'

import 'swiper/css'
import { getAdvertising } from '../../redux/advertising/advertisingThunk'

const Slider = () => {
   const sliderRef = useRef(null)
   const dispatch = useDispatch()
   const advertising = useSelector(state => state.advertising.advertising)

   useEffect(() => {
      dispatch(getAdvertising())
   }, [dispatch])

   const handlePrev = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slidePrev()
   }, [])

   const handleNext = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slideNext()
   }, [])

   return (
      <Wrapper>
         <StyledSwiper
            ref={sliderRef}
            modules={[Navigation, Autoplay]}
            slidesPerView="auto"
            spaceBetween={30}
            loop
            navigation={false}
            autoplay={{
               delay: 5000,
               disableOnInteraction: false,
            }}
         >
            {advertising.map(item => (
               <StyledSwiperSlide key={item.id}>
                  <img src={item.imageFile} alt="реклама" />
               </StyledSwiperSlide>
            ))}
            <PrevArrow onClick={handlePrev}>
               <SliderArrow />
            </PrevArrow>
            <NextArrow onClick={handleNext}>
               <SliderArrow />
            </NextArrow>
         </StyledSwiper>
      </Wrapper>
   )
}

export default Slider

const Wrapper = styled('div')({
   minHeight: '120px',
   marginTop: '20px',
})

const StyledSwiper = styled(Swiper)(({ theme }) => ({
   width: '100%',
   height: 'auto',
   position: 'relative',
   [theme.breakpoints.down('md')]: {},
}))

const StyledSwiperSlide = styled(SwiperSlide)(({ theme }) => ({
   width: '460px',
   height: '250px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
   },

   img: {
      width: '100%',
      borderRadius: '10px',
      objectFit: 'cover',
      [theme.breakpoints.down('md')]: {
         width: '90%',
         height: '280px',
      },
      [theme.breakpoints.down('sm')]: {
         width: '90%',
         height: '180px',
      },
   },
}))

const PrevArrow = styled('div')(({ theme }) => ({
   width: 'fit-content',
   padding: '12px 16px',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgb(226,234,248, .5)',
   position: 'absolute',
   zIndex: 100,
   top: '40%',
   cursor: 'pointer',
   left: '10%',
   [theme.breakpoints.down('md')]: {
      left: '10%',
   },
}))

const NextArrow = styled('div')(({ theme }) => ({
   width: 'fit-content',
   transform: 'rotate(180deg)',
   padding: '12px 16px',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgb(226,234,248, .5)',
   position: 'absolute',
   zIndex: 100,
   top: '40%',
   cursor: 'pointer',
   right: '10%',
   [theme.breakpoints.down('md')]: {
      right: '10%',
   },
}))
