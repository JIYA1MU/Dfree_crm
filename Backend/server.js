// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const app = express();

// app.use(express.json());
// app.use(cors());
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'kritika1999',
//   database: 'dfree_crm',
// });

// app.post('/customers', async (req, res) => {
//   try {
//     const { name, contactNumber, email, createdDate, owner, remarks, occupation, service, source} = req.body;
//     const [result] = await pool.query(
//       'INSERT INTO customers (name, contactNumber, email, createdDate, owner, remarks, occupation, service, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [name, contactNumber, email, createdDate, owner, remarks, occupation, service, source]
//     );
//     res.status(201).json({ id: result.insertId, ...req.body });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while adding the customer' });
//   }
// });
// app.delete('/customers/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query('DELETE FROM customers WHERE id = ?', [id]);
//     res.status(200).json({ message: 'Customer deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while deleting the customer' });
//   }
// });
// app.get('/customers', async (req, res) => {
//   try {
//       const [rows] = await pool.query('SELECT * FROM customers');
//       res.json(rows);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while fetching customers' });
//   }
// });
// app.post('/leads', async (req, res) => {
//   try {
//       const {
//           leadname,
//           email,
//           owner,
//           occupation,
//           source,
//           contactWithClient,
//           contactNumber,
//           createdDate,
//           remarks,
//           service,
//           leadStatus,
//           pricing
//       } = req.body;
      
//       const [result] = await pool.query(
//           `INSERT INTO leads (leadname, email, owner, occupation, source, contact_with_client, contact_number, created_date, remarks, service, lead_status, pricing) 
//            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [leadname, email, owner, occupation, source, contactWithClient, contactNumber, createdDate, remarks, service, leadStatus, pricing]
//       );
      
//       res.status(201).json({ id: result.insertId, ...req.body });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while adding the lead' });
//   }
// });
// app.get('/leads', async (req, res) => {
//   try {
//       const [rows] = await pool.query('SELECT * FROM leads');
//       res.json(rows);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while fetching leads' });
//   }
// });
// app.delete('/leads/:id', async (req, res) => {
//   try {
//       const { id } = req.params;
//       await pool.query('DELETE FROM leads WHERE id = ?', [id]);
//       res.status(200).json({ message: 'Lead deleted successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while deleting the lead' });
//   }
// });


// app.listen(5000, () => console.log('Server running on port 5000'));

import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mugdha@6123SUGA',
  database: 'dfree_crm_updated',
});

app.post('/customers', async (req, res) => {
  try {
    const { name, contactNumber, email, createdDate, owner, remarks, occupation, service, source } = req.body;
    const [result] = await pool.query(
      'INSERT INTO customers (name, contactNumber, email, createdDate, owner, remarks, occupation, service, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, contactNumber, email, createdDate, owner, remarks, occupation, service, source]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the customer' });
  }
});

app.delete('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM customers WHERE id = ?', [id]);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the customer' });
  }
});

app.get('/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching customers' });
  }
});

app.post('/leads', async (req, res) => {
  try {
    const { leadname, email, owner, occupation, source, contactWithClient, contactNumber, createdDate, remarks, service, leadStatus, pricing } = req.body;
    const [result] = await pool.query(
      `INSERT INTO leads (leadname, email, owner, occupation, source, contact_with_client, contact_number, created_date, remarks, service, lead_status, pricing) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [leadname, email, owner, occupation, source, contactWithClient, contactNumber, createdDate, remarks, service, leadStatus, pricing]
    );
    
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the lead' });
  }
});

app.get('/leads', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching leads' });
  }
});

app.delete('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM leads WHERE id = ?', [id]);
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the lead' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));