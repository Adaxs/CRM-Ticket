// middleware/roleMiddleware.js
const RoleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = RoleMiddleware;
