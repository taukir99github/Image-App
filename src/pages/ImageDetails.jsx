import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchImageDetails, fetchSimilarImages } from "../services/api";
import { Container, Typography, Button, CircularProgress } from "@mui/material";
import Rating from "@mui/material/Rating";
import SimilarProducts from "../components/SimilarProducts";
import { IoIosArrowRoundBack } from "react-icons/io";

const ImageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const imageData = await fetchImageDetails(id);
      setImage(imageData);

      const similarData = await fetchSimilarImages(imageData.category);
      setSimilarProducts(similarData.filter((product) => product.id !== id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleBuyNow = () => {
    console.log("Buy Now clicked");
  };

  const handleAddToCart = () => {
    console.log("Add to Cart clicked");
  };

  const renderImageDetails = useMemo(() => {
    if (!image) return null;
    return (
      <Container className="detailpage">
        <div className="detail-img">
          <img src={image.image} alt={image.title} style={{ width: "60%" }} />
        </div>
        <div className="detail_content">
          <Typography variant="h1">{image.title}</Typography>
          <Typography variant="body1">{image.description}</Typography>
          <div className="moredetails">
            <Typography variant="body1" gutterBottom>
              <span>Category : </span>
              {image.category}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <span>Price : </span>
              {`$${image.price}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <span>Reviews : </span>
              {`${image.rating.count} `}
            </Typography>
            <Rating
              name="read-only"
              value={image.rating.rate}
              precision={0.1}
              readOnly
            />
          </div>
          <div style={{ marginTop: 20 }} className="detailsPage-button">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBuyNow}
              sx={{ p: "12px 44px" }}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddToCart}
              sx={{ p: "12px 44px" }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Container>
    );
  }, [image]);

  if (loading) {
    return (
      <div className="cr-loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="back-button" onClick={() => navigate("/")}>
        <IoIosArrowRoundBack />
      </div>
      {renderImageDetails}
      <SimilarProducts products={similarProducts} />
    </>
  );
};

export default ImageDetails;
