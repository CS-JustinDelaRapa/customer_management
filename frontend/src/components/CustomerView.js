import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

const CustomerView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        CustomerService.getCustomer(id)
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => {
                console.error('Error loading customer:', error);
            });
    }, [id]);

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Customer Details</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>First Name:</strong> {customer.first_name}<br />
                        <strong>Last Name:</strong> {customer.last_name}<br />
                        <strong>Email:</strong> {customer.email}<br />
                        <strong>Contact Number:</strong> {customer.contact_number}<br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate(`/customers/${id}/edit`)}>
                        Edit
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>
                        Back to List
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CustomerView;
