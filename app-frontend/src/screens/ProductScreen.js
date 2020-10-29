import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  fetchSingleProduct,
  clearProductDetails,
} from '../actions/productActions';

const ProductScreen = ({ history, match }) => {
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

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?Quantity=${quantity}`);
  };

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

                {product.countInStock > 0 && (
                  <ListGroup.Item className="bg-light border-primary text-dark">
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="bg-light">
                  <Button
                    onClick={addToCartHandler}
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
