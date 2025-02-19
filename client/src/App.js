// client/src/App.js
<Route path="/admin/customers" element={<PrivateRoute requiredRole="admin"><Customers /></PrivateRoute>} />
