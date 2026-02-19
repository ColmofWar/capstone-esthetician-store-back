const express = require('express');
const router = express.Router();
const Ajv = require('ajv');

const ShoppingCart = require('../models/ShoppingCartItems');
const ExpressError = require('../helpers/expressError');
const { ensureCorrectUserOrAdmin, authenticateJWT } = require('../middleware/authenticate');

// schemas
const shoppingCartItemUpdate = require('../schemas/shoppingCartItemsUpdate.json');
const shoppingCartItemResponseSchema = require('../schemas/shoppingCartItemsResponse.json');


const ajv = new Ajv();
const validateCartPost = ajv.compile(shoppingCartItemUpdate);
const validateCartResponse = ajv.compile(shoppingCartItemResponseSchema);

// GET /shopping_cart_items/:username - Get user's shopping cart items (with optional query params for filtering)
router.get('/:username', authenticateJWT, ensureCorrectUserOrAdmin, async (req, res, next) => {
  console.log('[SHOPPING_CART_ITEMS] GET /shopping_cart_items/:username handler start');
  try {
    // Optionally, add query param validation here if you want to support filtering
    const username = req.params.username;
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      console.log('[SHOPPING_CART_ITEMS] User not found:', username);
      throw new ExpressError('User not found', 404);
    }

    // Optionally filter by product_id or other params
    const criteria = { user_id: user.id };
    if (req.query.product_id !== undefined) criteria.product_id = Number(req.query.product_id);

    let cart;
    if (Object.keys(req.query).length === 0) {
      cart = await ShoppingCart.viewCart(user.id);
    } else {
      // If filtering, get only matching items
      const items = await ShoppingCart.get(criteria);
      cart = { items };
    }

    if (!validateCartResponse(cart)) {
      console.log('[SHOPPING_CART_ITEMS] Invalid cart response schema:', cart);
      console.log('[SHOPPING_CART_ITEMS] Expected schema:', JSON.stringify(shoppingCartItemResponseSchema, null, 2));
      throw new ExpressError('Invalid cart response schema', 400);
    }
    console.log('[SHOPPING_CART_ITEMS] Returning cart for user:', username);
    return res.json({ cart });
  } catch (err) {
    console.log('[SHOPPING_CART_ITEMS] Error in GET /shopping_cart_items/:username', err);
    return next(err);
  }
});

// POST /shopping_cart_items/:username - Add item to shopping cart
router.post('/:username', authenticateJWT, ensureCorrectUserOrAdmin, async (req, res, next) => {
  console.log('[SHOPPING_CART_ITEMS] POST /shopping_cart_items/:username handler start');
  try {
    const username = req.params.username;
    const item = req.body;
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      console.log('[SHOPPING_CART_ITEMS] User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }
    // Attach user_id if not present
    if (!item.user_id) item.user_id = user.id;
    if (!validateCartPost(item)) {
      console.log('[SHOPPING_CART_ITEMS] Invalid item schema:', item);
      return next(ExpressError.BadRequest('Invalid item schema'));
    }
    const updatedCart = await ShoppingCart.UpdateCartItem(item);
    if (!updatedCart) {
      console.log('[SHOPPING_CART_ITEMS] Failed to add item for user id:', user.id);
      return res.status(404).json({ error: 'Failed to add item to cart' });
    }
    console.log('[SHOPPING_CART_ITEMS] Returning updated cart for user:', username);
    res.status(200).json({ cart: updatedCart });
  } catch (err) {
    console.log('[SHOPPING_CART_ITEMS] Error in POST /shopping_cart_items/:username', err);
    next(err);
  }
});

// DELETE /shopping_cart_items/:username/:itemId - Remove item from shopping cart
router.delete('/:username/:itemId', authenticateJWT, ensureCorrectUserOrAdmin, async (req, res, next) => {
  console.log('[SHOPPING_CART_ITEMS] DELETE /shopping_cart_items/:username/:itemId handler start');
  try {
    const username = req.params.username;
    const itemId = Number(req.params.itemId);
    if (!itemId) {
      console.log('[SHOPPING_CART_ITEMS] Invalid itemId:', req.params.itemId);
      return next(ExpressError.BadRequest('Invalid itemId'));
    }
    const User = require('../models/User');
    const user = await User.get(username);
    if (!user) {
      console.log('[SHOPPING_CART_ITEMS] User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }
    // Remove only the specific item from cart
    const deleteCartItem = await ShoppingCart.deleteCartItem(user.id, itemId);
    if (!validateCartResponse(deleteCartItem)) {
      console.log('[SHOPPING_CART_ITEMS] Invalid cart response schema after delete:', deleteCartItem);
      return next(ExpressError.BadRequest('Invalid cart response schema after delete'));
    }
    console.log('[SHOPPING_CART_ITEMS] Returning updated cart items after delete for user:', username);
    res.json({ cart: deleteCartItem });
  } catch (err) {
    console.log('[SHOPPING_CART_ITEMS] Error in DELETE /shopping_cart_items/:username/:itemId', err);
    next(err);
  }
});

module.exports = router;
