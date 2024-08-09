import { useEffect, useRef } from "react";
import styles from "./slideThumbnail.module.scss";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

interface ImageThumbnailProps {
  imagesUrl: String[]
  title: string
}

export default function SlideThumbnail({ imagesUrl, title }: ImageThumbnailProps) {
  const mainCarouselRef = useRef<Splide>(null)
  const thumbnailCarouselRef = useRef<Splide>(null)

  useEffect(() => {
    if (mainCarouselRef.current && thumbnailCarouselRef.current) {
      const mainSplide = mainCarouselRef.current.splide
      const thumbnailSplide = thumbnailCarouselRef.current.splide

      mainSplide?.on('move', (newIndex) => {
        thumbnailSplide?.go(newIndex)
      })

      thumbnailSplide?.on('move', (newIndex) => {
        mainSplide?.go(newIndex)
      })
    }
  }, [])

  return (
    <div className={styles.carouselWrapper}>
      <Splide
        className={styles.splideMainImage}
        ref={mainCarouselRef}
        options={{
          type: 'loop',
          perPage: 1,
          pagination: true,
          width: '700px',
          gap: 20,
          arrows: imagesUrl.length > 1,
          drag: imagesUrl.length > 1,
        }}
        aria-label="Real Estate Images"
        hasTrack={false}
      >
        <SplideTrack>
          {imagesUrl.map((imageUrl, index) => (
            <SplideSlide key={index}>
              <img
                src={`${process.env.NEXT_PUBLIC_BASEURL}/${imageUrl}`}
                alt={`Imagem ${index + 1} de ${title}`}
                className={styles.mainImage}
              />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
      <Splide
        className={styles.splideThumbnails}
        ref={thumbnailCarouselRef}
        options={{
          type: 'slide',
          perPage: 5,
          rewind: true,
          fixedWidth: 140,
          fixedHeight: 70,
          isNavigation: true,
          gap: 10,
          pagination: false,
          cover: true,
          focus: 'center',
          arrows: false,
          drag: imagesUrl.length > 1,
        }}
        aria-label="Real Estate Thumbnails"
        hasTrack={false}
      >
        <SplideTrack>
          {imagesUrl.map((imageUrl, index) => (
            <SplideSlide className={styles.splideSlideThumb} key={index}>
              <img
                src={`${process.env.NEXT_PUBLIC_BASEURL}/${imageUrl}`}
                alt={`Thumbnail ${index + 1} de ${title}`}
                className={styles.thumbnailImage}
              />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  )
}
