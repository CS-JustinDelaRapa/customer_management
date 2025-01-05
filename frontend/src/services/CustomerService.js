import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class CustomerService {
    getAllCustomers() {
        return axios.get(`${API_URL}/customers`);
    }

    getCustomer(id) {
        return axios.get(`${API_URL}/customers/${id}`);
    }

    createCustomer(customer) {
        return axios.post(`${API_URL}/customers`, customer);
    }

    updateCustomer(id, customer) {
        return axios.put(`${API_URL}/customers/${id}`, customer);
    }

    deleteCustomer(id) {
        return axios.delete(`${API_URL}/customers/${id}`);
    }
}

export default new CustomerService();
