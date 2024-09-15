import styles from "./CityImage.module.css";

const CityImage = ({ images }) => {

  return (
    <div className={styles.imageDiv}>
      {(!Array.isArray(images) || images.length === 0) && (
        <p className={styles.error}>No images found for this city!</p>
      )}
      {images.map((image, index) => (
        <img key={index} src={image.thumbnail} alt={`City image ${index}`} />
      ))}
    </div>
  );
};

export default CityImage;
