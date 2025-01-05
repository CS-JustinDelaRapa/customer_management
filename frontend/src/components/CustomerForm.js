import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

const CustomerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            CustomerService.getCustomer(id)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error('Error loading customer:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.contact_number) newErrors.contact_number = 'Contact number is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const savePromise = id
            ? CustomerService.updateCustomer(id, formData)
            : CustomerService.createCustomer(formData);

        savePromise
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error saving customer:', error);
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
            });
    };

    return (
        <Container className="mt-4">
            <h2>{id ? 'Edit Customer' : 'Add New Customer'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        isInvalid={!!errors.first_name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        isInvalid={!!errors.last_name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        isInvalid={!!errors.contact_number}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.contact_number}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {id ? 'Update' : 'Create'} Customer
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default CustomerForm;
