import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  fetchSingleProduct,
  clearProductDetails,
} from '../actions/productActions';

const ProductScreen = ({ match }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { isLoading, product, error } = productDetails;

  useEffect(() => {
    dispatch(fetchSingleProduct(match.params.id));

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light text-dark">
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light text-dark">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="bg-light text-dark">
                <h3>${product.price}</h3>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light text-dark">
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card className="border-primary">
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light border-primary text-dark">
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light border-primary text-dark">
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
