const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { ensureCorrectUserOrAdmin, authenticateJWT } = require('../middleware/authenticate');

// PATCH /address/:username/:type - Update an address for a user
router.patch('/:username/:type', authenticateJWT, async (req, res, next) => {
  console.log(`[ADDRESS] PATCH hit for user: ${req.params.username}, type: ${req.params.type}`);
  try {
    const { username, type } = req.params;
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.userFromParam = user; // pass user to next middleware
    return ensureCorrectUserOrAdmin(req, res, async (err) => {
      if (err) return next(err);
      // Find the address to update
      const addresses = await Address.get({ user_id: user.id, address_type: type });
      if (!addresses.length) {
        // If not found, create a new address (POST behavior)
        const addressData = {
          user_id: user.id,
          address_type: type,
          ...req.body
        };
        const address = await Address.create(addressData);
        return res.status(201).json({ address });
      }
      const address = await Address.update(addresses[0].id, req.body);
      return res.json({ address });
    });
  } catch (err) {
    next(err);
  }
});

// GET /address/:username/:type - Get a user's address by type
router.get('/:username/:type', authenticateJWT, async (req, res, next) => {
  console.log(`[ADDRESS] GET hit for user: ${req.params.username}, type: ${req.params.type}`);
  try {
    const { username, type } = req.params;
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.userFromParam = user;
    return ensureCorrectUserOrAdmin(req, res, async (err) => {
      if (err) return next(err);
      const addresses = await Address.get({ user_id: user.id, address_type: type });
      return res.json({ address: addresses[0] || null });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
