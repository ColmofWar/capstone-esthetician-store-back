const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { ensureCorrectUserOrAdmin, authenticateJWT } = require('../middleware/authenticate');

// POST /address/:username/:type - Create or update an address for a user
router.post('/:username/:type', authenticateJWT, ensureCorrectUserOrAdmin, async (req, res, next) => {
  console.log(`[ADDRESS] POST hit for user: ${req.params.username}, type: ${req.params.type}`);
  try {
    const { username, type } = req.params;
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const addressData = {
      user_id: user.id,
      address_type: type, // 'home' or 'billing'
      ...req.body
    };
    const address = await Address.create(addressData);
    return res.status(201).json({ address });
  } catch (err) {
    next(err);
  }
});

// GET /address/:username/:type - Get a user's address by type
router.get('/:username/:type', authenticateJWT, ensureCorrectUserOrAdmin, async (req, res, next) => {
  console.log(`[ADDRESS] GET hit for user: ${req.params.username}, type: ${req.params.type}`);
  try {
    const { username, type } = req.params;
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const addresses = await Address.get({ user_id: user.id, address_type: type });
    return res.json({ address: addresses[0] || null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
