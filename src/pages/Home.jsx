import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/api";
import {
  Container,
  Grid,
  Pagination,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CustomTextField from "../components/TextField";
import ImageCard from "../components/ImageCard";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash/debounce";

const Home = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const imagesPerPage = 6;

  useEffect(() => {
    const delaySearch = debounce(() => {
      setPage(1);
    }, 500); // Debounce time in milliseconds

    delaySearch();

    return delaySearch.cancel; // Cleanup debounce on unmount
  }, [query]);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const data = await fetchImages(query, page);
      setImages(data);
      setLoading(false);
    };
    getImages();
  }, [query, page]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filterImagesByTitle = React.useMemo(() => {
    return (title) => {
      return images.filter((image) =>
        image.title.toLowerCase().includes(title.toLowerCase())
      );
    };
  }, [images]);

  const paginatedImages = filterImagesByTitle(query).slice(
    (page - 1) * imagesPerPage,
    page * imagesPerPage
  );

  return (
    <Container className="home">
      <div className="image-page">
        <div className="heading">
          <h1>Image Search</h1>
        </div>
        <div className="searchField">
          <CustomTextField
            label="Search Images"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={query}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="cr-loader">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          {paginatedImages.map((image) => (
            <Grid item xs={6} sm={6} md={4} key={image.id}>
              <ImageCard image={image} />
            </Grid>
          ))}
        </Grid>
      )}
      <div className="pagination">
        <Pagination
          count={Math.ceil(filterImagesByTitle(query).length / imagesPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </Container>
  );
};

export default Home;
