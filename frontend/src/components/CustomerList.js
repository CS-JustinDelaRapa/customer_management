import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = () => {
        CustomerService.getAllCustomers()
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error loading customers:', error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            CustomerService.deleteCustomer(id)
                .then(() => {
                    loadCustomers();
                })
                .catch(error => {
                    console.error('Error deleting customer:', error);
                });
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <h2>Customer List</h2>
                </Col>
                <Col className="text-end">
                    <Link to="/customers/new">
                        <Button variant="primary">Add New Customer</Button>
                    </Link>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.contact_number}</td>
                            <td>
                                <Link to={`/customers/${customer.id}`}>
                                    <Button variant="info" size="sm" className="me-2">View</Button>
                                </Link>
                                <Link to={`/customers/${customer.id}/edit`}>
                                    <Button variant="warning" size="sm" className="me-2">Edit</Button>
                                </Link>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(customer.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CustomerList;
