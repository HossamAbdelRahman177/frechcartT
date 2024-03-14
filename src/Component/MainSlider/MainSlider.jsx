import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import $ from "jquery";

export default function MainSlider() {
  return (
    <div className="row g-0 my-5">
      <div className="col-md-9">
        <OwlCarousel
          items={1}
          loop
          autoplay={true}
          dots={true}
          autoplayTimeout={2000}
        >
          <div className="item">
            <img
              src="images/slider-image-3.jpeg"
              className="w-100"
              height={400}
              alt=""
            />
          </div>
          <div className="item">
            <img
              src="images/slider-image-1.jpeg"
              className="w-100"
              height={400}
              alt=""
            />
          </div>
          <div className="item">
            <img
              src="images/slider-image-2.jpeg"
              className="w-100"
              height={400}
              alt=""
            />
          </div>
        </OwlCarousel>
      </div>
      <div className="col-md-3">
        <img
          src="images/slider-image-1.jpeg"
          alt=""
          height={200}
          className="w-100"
        />
        <img
          src="images/slider-image-2.jpeg"
          alt=""
          height={200}
          className="w-100"
        />
      </div>
    </div>
  );
}
