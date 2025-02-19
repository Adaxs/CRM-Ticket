// routes/customerRoutes.js
const express = require('express');
const Customer = require('../models/Customer');
const verifyToken = require('../middleware/authMiddleware');
const RoleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Only admin can access customer management routes
router.post('/', verifyToken, RoleMiddleware('admin'), async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
