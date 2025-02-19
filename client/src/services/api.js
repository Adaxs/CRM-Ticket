import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCustomers = async () => {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
};
