'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from "./slide.module.scss";
import { RealEstateType } from '@/app/services/realEstateService';
import SlideCard from '../slideCard/SlideCard';

interface props {
  realEstate: RealEstateType[]
}

export default function Slide({ realEstate }: props) {
  return (
    <>
      <div>
        <Splide
          options={{
            type: 'loop',
            perPage: 4,
            perMove: 1,
            pagination: false,
          }}
        >
          {realEstate?.map((realEstate) => (
            <SplideSlide key={realEstate.id}>
              <SlideCard realEstate={realEstate} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  )
}