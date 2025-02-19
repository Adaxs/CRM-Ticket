import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/customers">Manage Customers</Link></li>
                    <li><Link to="/admin/events">Manage Events</Link></li>
                </ul>
            </nav>
        </div>
    );
}

function ManageCustomers() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/api/customers", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(res.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/customers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCustomers();
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const updateCustomer = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`/api/customers/${editingCustomer._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingCustomer(null);
            fetchCustomers();
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <div>
            <h2>Manage Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer._id}>
                        {customer.name} - {customer.email}
                        <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
                        <button onClick={() => setEditingCustomer(customer)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingCustomer && (
                <div>
                    <h3>Edit Customer</h3>
                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    <button onClick={updateCustomer}>Save</button>
                </div>
            )}
        </div>
    );
}

function ManageEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/api/events", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const deleteEvent = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div>
            <h2>Manage Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        {event.title} - {event.location}
                        <button onClick={() => deleteEvent(event._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { AdminDashboard, ManageCustomers, ManageEvents };