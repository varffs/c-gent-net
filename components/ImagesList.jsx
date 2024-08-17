import Image from "next/image";

import styles from "@/styles/ImagesList.module.css";

import { useState, forwardRef, useImperativeHandle } from "react";

const ImagesList = forwardRef(function ImagesList({ imagesList }, ref) {
  const [activeImage, setActiveImage] = useState(false);

  const handleClick = (index) => {
    if (activeImage === index) {
      setActiveImage(false);
    } else {
      setActiveImage(index);
    }
  };

  useImperativeHandle(ref, () => ({
    setActiveImage: (index) => {
      setActiveImage(index);
    },
  }));

  return (
    <section className={styles.imagesList}>
      {imagesList.map((image, index) => (
        <div
          key={index}
          className={
            activeImage === index
              ? [styles.imagesTile, styles.imagesTileActive].join(" ")
              : styles.imagesTile
          }
          onClick={() => handleClick(index)}
        >
          <Image src={image.url} alt={image.name} width={500} height={500} />
        </div>
      ))}
    </section>
  );
});

export default ImagesList;