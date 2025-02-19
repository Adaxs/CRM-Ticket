require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Import Routes
const customerRoutes = require("./src/routes/customerRoutes");
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
