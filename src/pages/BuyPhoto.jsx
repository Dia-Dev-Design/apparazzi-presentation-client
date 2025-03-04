import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const BuyPhoto = () => {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const photo = location.state?.photo; // Get the passed photo object

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    address: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
        const response = await fetch(`/api/buy/${photoId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Purchase failed. Please try again.");
        }

        const responseData = await response.json();

        if (responseData) {
            setSuccess(true);
            setTimeout(() => navigate("/"), 3000);
        } else {
            setError("Unknown error occurred. Please try again.");
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <BuyPhotoContainer>
      <h1>Buy {photo ? `Photo #${photo._id}` : "Photo"}</h1>
      {photo && <Image src={photo.imageUrl} alt="Selected Photograph" />}
      <p>Price: {photo ? `$${photo.price || 125}` : "Unknown"}</p>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Purchase successful! Redirecting...</SuccessMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name:</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Country:</Label>
          <Input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Card Number:</Label>
          <Input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Expiration Date:</Label>
          <Input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>CVV:</Label>
          <Input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </Form>
    </BuyPhotoContainer>
  );
};

export default BuyPhoto;

// Styled Components
const BuyPhotoContainer = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #888;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;
