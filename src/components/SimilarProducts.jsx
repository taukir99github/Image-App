import React from "react";
import { Typography } from "@mui/material";
import ImageCard from "./ImageCard";
import Slider from "react-slick";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const SimilarProducts = ({ products }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    nextArrow: <SlArrowRight />,
    prevArrow: <SlArrowLeft />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="similar-products">
      <Typography
        variant="h1"
        gutterBottom
        style={{ textAlign: "left" }}
        className="similar-title"
      >
        Similar Products
      </Typography>
      <div className="similar-carosal">
        <Slider {...settings} style={{ width: "90%" }}>
          {products.map((product) => (
            <div key={product.id} className="semilar-card">
              <ImageCard image={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SimilarProducts;
