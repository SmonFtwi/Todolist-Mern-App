const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.secret);
      req.user = decoded; // Add user information to the request object
      //console.log('Decoded Token:', decoded);
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };

  module.exports= authMiddleware;