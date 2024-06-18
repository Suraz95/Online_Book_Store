import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({
    name: '',
    email: '',
    timestamps: [],
    orders: []
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://online-book-store-ten.vercel.app/customers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleEdit = (id) => {
    setEditingCustomerId(id);
    const customerToEdit = customers.find(customer => customer._id === id);
    setEditedCustomer({ ...customerToEdit });
  };

  const handleEditChange = (e) => {
    setEditedCustomer({
      ...editedCustomer,
      [e.target.name]: e.target.value
    });
  };

  const handleCancelEdit = () => {
    setEditingCustomerId(null);
    setEditedCustomer({
      name: '',
      email: '',
      timestamps: [],
      orders: []
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://online-book-store-ten.vercel.app/customers/${editingCustomerId}`, editedCustomer, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedCustomers = customers.map(customer => {
        if (customer._id === editingCustomerId) {
          return editedCustomer;
        }
        return customer;
      });
      setCustomers(updatedCustomers);
      setEditingCustomerId(null);
      setEditedCustomer({
        name: '',
        email: '',
        timestamps: [],
        orders: []
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://online-book-store-ten.vercel.app/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="flex h-screen">
        <div className="flex-1 ml-64 p-8">
          <div className="bg-white p-8 rounded shadow-lg w-4/5 max-w-full text-center animate-fade-in mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Customers</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Login Date</th>
                    <th className="py-2 px-4 border-b">Login Time</th>
                    <th className="py-2 px-4 border-b">Logout Time</th>
                    <th className="py-2 px-4 border-b">Orders</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map(customer => {
                      const groupedTimestamps = groupTimestampsByDate(customer.timestamps);
                      return (
                        Object.keys(groupedTimestamps).map(date => (
                          groupedTimestamps[date].map((timestamp, index) => (
                            <tr key={`${customer._id}-${date}-${index}`}>
                              {index === 0 && (
                                <>
                                  <td className="py-2 px-4 border-b" rowSpan={groupedTimestamps[date].length}>
                                    {editingCustomerId === customer._id ? (
                                      <input
                                        type="text"
                                        name="name"
                                        value={editedCustomer.name}
                                        onChange={handleEditChange}
                                        className="border border-gray-400 rounded mr-2 px-2 py-1"
                                      />
                                    ) : (
                                      customer.name
                                    )}
                                  </td>
                                  <td className="py-2 px-4 border-b" rowSpan={groupedTimestamps[date].length}>
                                    {editingCustomerId === customer._id ? (
                                      <input
                                        type="email"
                                        name="email"
                                        value={editedCustomer.email}
                                        onChange={handleEditChange}
                                        className="border border-gray-400 rounded mr-2 px-2 py-1"
                                      />
                                    ) : (
                                      customer.email
                                    )}
                                  </td>
                                </>
                              )}
                              <td className="py-2 px-4 border-b">{date}</td>
                              <td className="py-2 px-4 border-b">{timestamp.login.split(' ')[1]}</td>
                              <td className="py-2 px-4 border-b">{timestamp.logout ? timestamp.logout.split(' ')[1] : 'NA'}</td>
                              {index === 0 && (
                                <td className="py-2 px-4 border-b" rowSpan={groupedTimestamps[date].length}>
                                  {customer.orders.length > 0 ? (
                                    <ul>
                                      {customer.orders.map(order => (
                                        <li key={order}>Order ID: {order}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    'No orders'
                                  )}
                                </td>
                              )}
                              {index === 0 && (
                                <td className="py-2 px-4 border-b" rowSpan={groupedTimestamps[date].length}>
                                  {editingCustomerId === customer._id ? (
                                    <>
                                      <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2">Save</button>
                                      <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
                                    </>
                                  ) : (
                                    <>
                                      <button onClick={() => handleEdit(customer._id)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">Edit</button>
                                      <button onClick={() => handleDelete(customer._id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
                                    </>
                                  )}
                                </td>
                              )}
                            </tr>
                          ))
                        ))
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-2 px-4 border-b text-center">No customers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const groupTimestampsByDate = (timestamps) => {
  return timestamps.reduce((groups, timestamp) => {
    const date = timestamp.login.split(' ')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(timestamp);
    return groups;
  }, {});
};

export default CustomerDashboard;
