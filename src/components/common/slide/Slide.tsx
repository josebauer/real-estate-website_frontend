'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from "./slide.module.scss";
import { RealEstateType } from '@/services/realEstateService';
import SlideCard from '../slideCard/SlideCard';

interface props {
  realEstate: RealEstateType[]
}

export default function Slide({ realEstate }: props) {
  let slideCount = 0
  
  if (realEstate.length >= 3) {
    slideCount = 3
  } else if (realEstate.length < 3) {
    slideCount = realEstate.length
  }

  return (
    <>
      <div className='pb-5'>
        <Splide
          options={{
            type: 'loop',
            perPage: slideCount,
            perMove: 1,
            width: 1300,
            gap: '1rem',  
            pagination: false,
            arrows: realEstate.length > 4 ? true : false,
            drag: realEstate.length > 4 ? true : false,
            breakpoints: {
              1400: {
                width: 1100
              },
              1200: {
                perPage: 2,
                width: 750,
              },
              768: {
                perPage: 1,
                width: 400
              },
              420: {
                width: 350
              },
              368: {
                width: 300
              }
            }
          }}
        >
          {Array.isArray(realEstate) && realEstate.map((realEstateItem) => (
            <SplideSlide key={realEstateItem.id}>
              <SlideCard realEstate={realEstateItem} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  )
}