 
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

// eslint-disable-next-line react/prop-types
const Img = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt="rtx30"
      effect="opacity"
      src={src}
    />
  );
};

export default Img;
