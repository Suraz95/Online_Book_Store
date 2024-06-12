const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const { Book, Publisher } = require('./models/Book');
const Customer = require("./models/Customer");

app.use(express.json());
app.use(cors());

const db = "mongodb+srv://shaiksuraz50:8Zhg3S9vanvvSlOE@cluster0.tre1ikc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const jwtSecret = 'e0f90e50d589ab7f4a2d1f6e8b6c2d86d761a1f6d937274fa8b2f98e3d50de5b52b7328b9f1e6e2c2eab9e842d2c4d4d2738d0fa7355bb8fd28cf437a9e2d6d6';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  } else {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

mongoose.connect(db)
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Customer.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ email: user.email, userType: user.userType, username: user.username }, jwtSecret, { expiresIn: '1d' });

          const loginTimestamp = formatDate(new Date());
          user.timestamps.push({ login: loginTimestamp });

          user.save()
            .then(() => {
              res.json({ token });
            })
            .catch((err) => {
              console.log("Error saving login timestamp:", err);
              res.status(500).json({ error: "Could not save login timestamp" });
            });
        } else {
          res.status(401).json({ error: "The password is incorrect" });
        }
      } else {
        res.status(404).json({ error: "No user exists" });
      }
    })
    .catch((err) => {
      console.log("Error finding user:", err);
      res.status(500).json({ error: "Could not find user" });
    });
});

app.post("/signup", (req, res) => {
  const { name, phone, username, email, password, userType } = req.body;
  Customer.findOne({ $or: [{ email }, { phone }, { username }] })
    .then((existingCustomer) => {
      if (existingCustomer) {
        res.status(400).json({ error: "Email, phone number or username already exists" });
      } else {
        const newCustomer = new Customer({ name, phone, username, email, password, userType });
        newCustomer.save()
          .then((customer) => {
            res.status(201).json({ message: "Successfully registered", customer });
          })
          .catch((err) => {
            console.log("Error creating customer:", err);
            res.status(500).json({ error: "Could not create customer" });
          });
      }
    })
    .catch((err) => {
      console.log("Error finding customer:", err);
      res.status(500).json({ error: "Could not check existing customer" });
    });
});

app.get('/customers', authenticateJWT, (req, res) => {
  Customer.find({ userType: 'customer' })
    .then(customers => {
      res.json(customers);
    })
    .catch(err => {
      console.log("Error fetching customers:", err);
      res.status(500).json({ error: "Could not fetch customers" });
    });
});

app.delete('/customers/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  Customer.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Customer deleted successfully" });
    })
    .catch(err => {
      console.log("Error deleting customer:", err);
      res.status(500).json({ error: "Could not delete customer" });
    });
});

app.post("/logout", authenticateJWT, (req, res) => {
  const email = req.user.email;

  Customer.findOne({ email })
    .then((user) => {
      if (user) {
        const logoutTimestamp = formatDate(new Date());
        const lastLogin = user.timestamps[user.timestamps.length - 1];

        if (lastLogin && !lastLogin.logout) {
          lastLogin.logout = logoutTimestamp;
        } else {
          user.timestamps.push({ logout: logoutTimestamp });
        }

        user.save()
          .then(() => {
            res.json({ message: "Logout timestamp saved" });
          })
          .catch((err) => {
            console.log("Error saving logout timestamp:", err);
            res.status(500).json({ error: "Could not save logout timestamp" });
          });
      } else {
        res.status(404).json({ error: "No user exists" });
      }
    })
    .catch((err) => {
      console.log("Error finding user:", err);
      res.status(500).json({ error: "Could not find user" });
    });
});
app.get('/user/token', authenticateJWT, (req, res) => {
  const { email, userType } = req.user; // Assuming user email and userType are decoded from JWT
  const token = jwt.sign({ email, userType }, jwtSecret, { expiresIn: '1d' });
  res.json({ userId: email, token }); // Assuming user ID is the email for simplicity
});

app.put('/customers/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const updatedCustomerData = req.body;

  Customer.findByIdAndUpdate(id, updatedCustomerData, { new: true })
    .then(updatedCustomer => {
      if (!updatedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(updatedCustomer);
    })
    .catch(err => {
      console.log("Error updating customer:", err);
      res.status(500).json({ error: "Could not update customer" });
    });
});

app.post('/dashboard/book', authenticateJWT, async (req, res) => {
  const { publisher, title, author, genre, description, imageUrl, totalCopies, copiesAvailable } = req.body;

  try {
    let existingPublisher = await Publisher.findOne({ publisher });

    if (existingPublisher) {
      const existingBook = existingPublisher.books.find(book => book.title === title);

      if (existingBook) {
        return res.status(400).json({ message: 'Book title already exists under this publisher.' });
      } else {
        existingPublisher.books.push({ title, author, genre, description, imageUrl, totalCopies, copiesAvailable });
        await existingPublisher.save();
        res.status(201).json({ message: 'Book added to existing publisher.' });
      }
    } else {
      const newPublisher = new Publisher({
        publisher,
        books: [{ title, author, genre, description, imageUrl, totalCopies, copiesAvailable }]
      });
      await newPublisher.save();
      res.status(201).json({ message: 'New publisher and book added.' });
    }
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/publishers', authenticateJWT, async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (error) {
    console.error('Error fetching publishers:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
app.get('/books', async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Could not fetch books" });
  }
});

app.put('/wishlist', authenticateJWT, async (req, res) => {
  const { bookTitle } = req.body; // Extract book title from request body

  try {
    const { email } = req.user; // User information from JWT

    // Find the user based on the email
    const customer = await Customer.findOne({ email }); // Assuming you have a Customer model

    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the book to the wishlist if it's not already there
    if (!customer.wishlist.includes(bookTitle)) {
      customer.wishlist.push(bookTitle);
      await customer.save();
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error adding book to wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/wishlist', authenticateJWT, async (req, res) => {
  const { bookTitle } = req.body; // Extract book title from request body

  try {
    const { email } = req.user; // User information from JWT

    // Find the user based on the email
    const customer = await Customer.findOne({ email }); // Assuming you have a Customer model

    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the book from the wishlist if it exists
    const index = customer.wishlist.indexOf(bookTitle);
    if (index > -1) {
      customer.wishlist.splice(index, 1);
      await customer.save();
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error removing book from wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/wishlist', authenticateJWT, async (req, res) => {
  try {
    const { email } = req.user; // User information from JWT

    // Find the user based on the email
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ wishlist: customer.wishlist });
  } catch (error) {
    console.error('Error retrieving wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/books', authenticateJWT, async (req, res) => {
  try {
    const publishers = await Publisher.find();
    const books = publishers.reduce((acc, publisher) => acc.concat(publisher.books), []);
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/purchase', authenticateJWT, async (req, res) => {
  try {
    const { bookTitle } = req.body;
    const { username } = req.user;

    const publisher = await Publisher.findOne({ 'books.title': bookTitle });
    if (!publisher) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const book = publisher.books.find(book => book.title === bookTitle);
    if (book.copiesAvailable <= 0) {
      return res.status(400).json({ message: 'No copies available' });
    }

    book.copiesAvailable -= 1;
    book.SoldCopies = book.SoldCopies ? book.SoldCopies + 1 : 1;
    await publisher.save();

    const customer = await Customer.findOne({ username });
    if (customer) {
      const wishlistIndex = customer.wishlist.indexOf(bookTitle);
      if (wishlistIndex > -1) {
        customer.wishlist.splice(wishlistIndex, 1);
      }

      customer.orders.push(bookTitle);
      await customer.save();
    }

    res.status(200).json({ message: 'Purchase successful', book });
  } catch (error) {
    console.error('Error completing purchase:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/orders', authenticateJWT, async (req, res) => {
  console.log('Received request at /orders');
  try {
    const { bookTitle, userName } = req.body;
    console.log('Request body:', req.body);

    const customer = await Customer.findOne({ userName });
    if (!customer) {
      console.log('Customer not found');
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.orders.push(bookTitle);
    await customer.save();

    res.status(200).json({ message: 'Book added to orders' });
  } catch (error) {
    console.error('Error adding book to orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
