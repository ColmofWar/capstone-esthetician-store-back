BEGIN;
-- SEED DATA

-- CATEGORIES (explicit ids preserved)
INSERT INTO categories (id, category_id, name) VALUES
(1, NULL, 'Cleanser'),
(2, NULL, 'Toner'),
(3, NULL, 'Serum'),
(4, NULL, 'Moisturizer'),
(5, NULL, 'Sunscreen'),
(6, 3, 'Vitamin C Serums'),
(7, 3, 'Retinol Serums'),
(8, 4, 'Night Creams');

-- PRODUCTS (explicit ids preserved)
INSERT INTO products (id, category_id, name, brand, description, price, stock_quantity, image_url, alt_text) VALUES
(1, 1, 'Gentle Cream Cleanser', 'CeraVe', 'Non-foaming cleanser with ceramides for dry skin', 14.99, 150, '/images/p1.jpg', 'Gentle Cream Cleanser'),
(2, 1, 'Deep Pore Cleanser Gel', 'NeutriGlow', 'Gel cleanser with salicylic acid for oily & acne-prone skin', 16.50, 120, '/images/p2.jpg', 'Deep Pore Cleanser Gel'),
(3, 1, 'Foaming Facial Wash', 'PureSkin Co.', 'Mild foam cleanser that removes makeup and dirt', 12.99, 130, '/images/p3.jpg', 'Foaming Facial Wash'),
(4, 1, 'Charcoal Purifying Cleanser', 'DermaLux', 'Activated charcoal cleanser to detoxify pores', 18.75, 90, '/images/p4.jpg', 'Charcoal Purifying Cleanser'),
(5, 1, 'Hydrating Micellar Cleanser', 'GlowTheory', 'No‑rinse micellar water for sensitive skin', 13.25, 140, '/images/p5.jpg', 'Hydrating Micellar Cleanser'),

(6, 2, 'Balancing Toner', 'CeraVe', 'Alcohol-free toner for all skin types', 13.50, 100, '/images/p6.jpg', 'Balancing Toner'),
(7, 2, 'Clarifying BHA Toner', 'The Ordinary', 'Toner with 2% salicylic acid for exfoliation', 10.50, 110, '/images/p7.jpg', 'Clarifying BHA Toner'),
(8, 2, 'Rosewater Toner', 'BioBotanics', 'Toner with rosewater and aloe to soothe skin', 15.50, 80, '/images/p8.jpg', 'Rosewater Toner'),
(9, 2, 'Herbal Calming Toner', 'PureSkin Co.', 'Toner with witch hazel and chamomile', 11.99, 95, '/images/p9.jpg', 'Herbal Calming Toner'),
(10, 2, 'Pore Minimizing Toner', 'NeutriGlow', 'Toner to tighten and refine pores', 14.20, 90, '/images/p10.jpg', 'Pore Minimizing Toner'),

(11, 3, 'Hyaluronic Acid Serum', 'GlowTheory', 'Hydrating serum with high & low molecular HA', 31.00, 70, '/images/p11.jpg', 'Hyaluronic Acid Serum'),
(12, 3, 'Peptide Complex Serum', 'DermaLux', 'Anti-aging peptide blend to firm skin', 39.99, 60, '/images/p12.jpg', 'Peptide Complex Serum'),
(13, 3, 'Niacinamide + Zinc Serum', 'The Ordinary', '10% niacinamide with zinc for blemish control', 6.50, 120, '/images/p13.jpg', 'Niacinamide + Zinc Serum'),
(14, 3, 'Antioxidant C‑E Ferulic', 'BioBotanics', 'Serum with vitamin C, E, and ferulic acid', 45.00, 50, '/images/p14.jpg', 'C-E Ferulic Serum'),
(15, 3, 'Brightening Licorice Serum', 'PureSkin Co.', 'Light serum to reduce dark spots and brighten', 28.00, 85, '/images/p15.jpg', 'Brightening Licorice Serum'),

(16, 6, 'Vitamin C 20% Suspension', 'The Ordinary', 'Pure vitamin C powder in silicone base', 8.90, 100, '/images/p16.jpg', 'Vitamin C 20% Suspension'),
(17, 6, 'C + E + Ferulic Complex', 'DermaLux', 'Advanced vitamin C formula with stabilizers', 42.50, 45, '/images/p17.jpg', 'C + E + Ferulic Complex'),
(18, 6, 'Hydrating Vitamin C Serum', 'GlowTheory', 'Gentle vitamin C for sensitive skin', 29.50, 75, '/images/p18.jpg', 'Hydrating Vitamin C Serum'),
(19, 6, 'Vitamin C Bright Gel', 'BioBotanics', 'Gel-based vitamin C for normal to oily skin', 34.99, 55, '/images/p19.jpg', 'Vitamin C Bright Gel'),
(20, 6, 'Vitamin C Overnight Booster', 'PureSkin Co.', 'Leave-on vitamin C booster for night use', 24.99, 65, '/images/p20.jpg', 'Vitamin C Overnight Booster'),

(21, 7, 'Retinol 0.5% in Squalane', 'The Ordinary', 'Water-free retinol formulation', 9.80, 110, '/images/p21.jpg', 'Retinol 0.5% in Squalane'),
(22, 7, 'Advanced Retinol Serum', 'DermaLux', 'Encapsulated retinol with peptides', 48.00, 40, '/images/p22.jpg', 'Advanced Retinol Serum'),
(23, 7, 'Retinol Night Repair', 'GlowTheory', 'Gentle retinol blend for nightly use', 38.75, 55, '/images/p23.jpg', 'Retinol Night Repair'),
(24, 7, 'Retinol Resurfacing Serum', 'BioBotanics', 'Retinol + AHAs for smoother skin', 44.50, 35, '/images/p24.jpg', 'Retinol Resurfacing Serum'),
(25, 7, 'Retinol Capsule Concentrate', 'PureSkin Co.', 'Single-dose retinol capsules for treatment', 22.99, 60, '/images/p25.jpg', 'Retinol Capsule Concentrate'),

(26, 4, 'Light Gel Moisturizer', 'NeutriGlow', 'Oil-free gel moisturizer with aloe', 17.95, 100, '/images/p26.jpg', 'Light Gel Moisturizer'),
(27, 4, 'Daily Hydrating Cream', 'CeraVe', 'Non-comedogenic cream with ceramides', 18.99, 120, '/images/p27.jpg', 'Daily Hydrating Cream'),
(28, 4, 'Barrier Repair Cream', 'DermaLux', 'Cream to support skin barrier with lipids', 29.99, 75, '/images/p28.jpg', 'Barrier Repair Cream'),
(29, 4, 'Oil-Control Moisturizer', 'PureSkin Co.', 'Mattifying moisturizer for oily skin', 19.50, 90, '/images/p29.jpg', 'Oil-Control Moisturizer'),
(30, 4, 'Night Recovery Cream', 'GlowTheory', 'Rich overnight formula for repair', 25.75, 65, '/images/p30.jpg', 'Night Recovery Cream'),

(31, 8, 'Deep Night Repair Cream', 'DermaLux', 'Repairing night cream with peptides & ceramides', 37.50, 50, '/images/p31.jpg', 'Deep Night Repair Cream'),
(32, 8, 'Pro Age Night Cream', 'BioBotanics', 'Anti-aging night cream with retinol & hyaluronic', 33.99, 45, '/images/p32.jpg', 'Pro Age Night Cream'),
(33, 8, 'Hydra Night Balm', 'PureSkin Co.', 'Balmy texture for overnight hydration', 27.50, 55, '/images/p33.jpg', 'Hydra Night Balm'),
(34, 8, 'Restore Night Moisturizer', 'GlowTheory', 'Moisturizer for skin renewal during sleep', 30.00, 60, '/images/p34.jpg', 'Restore Night Moisturizer'),
(35, 8, 'Ceramide Night Cream', 'CeraVe', 'Ceramide-rich night cream to lock moisture', 29.25, 70, '/images/p35.jpg', 'Ceramide Night Cream'),

(36, 5, 'Ultra Defense Sunscreen SPF 50', 'DermaLux', 'Broad-spectrum mineral sunscreen', 22.00, 80, '/images/p36.jpg', 'Ultra Defense Sunscreen 50'),
(37, 5, 'Daily Glow Sunscreen SPF 30', 'BioBotanics', 'Everyday dewy finish sunscreen', 20.00, 95, '/images/p37.jpg', 'Daily Glow SPF 30'),
(38, 5, 'Matte Finish SPF 45', 'PureSkin Co.', 'Sunscreen with matte finish for oily skin', 23.50, 85, '/images/p38.jpg', 'Matte Finish SPF 45'),
(39, 5, 'Sport Water-Resist SPF 70', 'NeutriGlow', 'Water-resistant sunscreen for sports', 28.00, 60, '/images/p39.jpg', 'Sport SPF 70'),
(40, 5, 'Mineral Tint SPF 40', 'GlowTheory', 'Tinted mineral sunscreen with zinc', 24.75, 70, '/images/p40.jpg', 'Mineral Tint SPF 40'),

(41, 3, 'Hydroquinone 2% Serum', 'DermaLux', 'Dark spot treatment with hydroquinone and antioxidants', 49.99, 30, '/images/p41.jpg', 'Hydroquinone 2% Serum'),
(42, 4, 'Cica Repair Cream', 'PureSkin Co.', 'Soothing cream with centella asiatica', 26.00, 95, '/images/p42.jpg', 'Cica Repair Cream'),
(43, 2, 'AHA/BHA Exfoliating Toner', 'GlowTheory', 'Chemical exfoliant with glycolic and salicylic acids', 18.50, 65, '/images/p43.jpg', 'AHA/BHA Exfoliating Toner'),
(44, 1, 'Gentle Milk Cleanser', 'CeraVe', 'Milk cleanser for dry or sensitive skin', 15.50, 100, '/images/p44.jpg', 'Gentle Milk Cleanser'),
(45, 4, 'SPF Moisturizing Cream', 'BioBotanics', 'Moisturizer with built‑in SPF 20 for daily use', 21.50, 80, '/images/p45.jpg', 'SPF Moisturizing Cream'),

(46, 7, 'Slow Release Retinol 1%', 'DermaLux', 'Controlled-release retinol in a gentle formula', 52.00, 25, '/images/p46.jpg', 'Slow Release Retinol 1%'),
(47, 7, 'Retinol Eye Serum', 'GlowTheory', 'Gentle retinol formula for under-eye area', 32.00, 50, '/images/p47.jpg', 'Retinol Eye Serum'),
(48, 6, 'Vitamin C + Peptide Serum', 'PureSkin Co.', 'Vitamin C paired with peptides for bright & firm skin', 36.99, 45, '/images/p48.jpg', 'Vitamin C + Peptide Serum'),
(49, 8, 'Night Renewal Balm', 'DermaLux', 'Rich balm for overnight repair and glow', 34.50, 55, '/images/p49.jpg', 'Night Renewal Balm'),
(50, 4, 'Hydroboost Moisturizer with HA', 'BioBotanics', 'Hydrating cream with multiple hyaluronic acids', 28.75, 75, '/images/p50.jpg', 'Hydroboost Moisturizer HA');

INSERT INTO users (id, username, email, password_hash, phone) VALUES
(1, 'johndoe', 'johndoe@example.com', 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', 5551234567),
(2, 'janesmith', 'janesmith@example.com', 'd4e5f6a7b8c9d0e1f2a3b4c5d6a1b2c3', 5559876543),
(3, 'alexj', 'alexj@example.com', 'f6a7b8c9d0e1f2a3b4c5d6a1b2c3d4e5', 5554567890),
(4, 'sarahk', 'sarahk@example.com', 'e5f6a7b8c9d0e1f2a3b4c5d6a1b2c3d4', 5553216549),
(5, 'brianm', 'brianm@example.com', 'c9d0e1f2a3b4c5d6a1b2c3d4e5f6a7b8', 5551122334),
(6, 'natalie_r', 'natalie.r@example.com', 'b4c5d6a1b2c3d4e5f6a7b8c9d0e1f2a3', 5556677889),
(7, 'davidp', 'davidp@example.com', 'd0e1f2a3b4c5d6a1b2c3d4e5f6a7b8c9', 5554433221),
(8, 'emilyw', 'emilyw@example.com', 'a3b4c5d6a1b2c3d4e5f6a7b8c9d0e1f2', 5553344556),
(9, 'mike89', 'mike89@example.com', 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6a1', 5557788990),
(10, 'laurab', 'laurab@example.com', 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6a1b2', 5552233445),
(11, 'tonyr', 'tonyr@example.com', 'f2a3b4c5d6a1b2c3d4e5f6a7b8c9d0e1', 5556655443),
(12, 'angelat', 'angelat@example.com', 'e1f2a3b4c5d6a1b2c3d4e5f6a7b8c9d0', 5559988776),
(13, 'chrisl', 'chrisl@example.com', 'a7b8c9d0e1f2a3b4c5d6a1b2c3d4e5f6', 5558899001),
(14, 'karenm', 'karenm@example.com', 'd6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5', 5557766554),
(15, 'omars', 'omars@example.com', 'c5d6a1b2c3d4e5f6a7b8c9d0e1f2a3b4', 5553322110);

INSERT INTO addresses (id, user_id, street, city, state, postal_code, country, address_type) VALUES
(1, 1, '123 Maple St', 'Springfield', 'IL', '62704', 'USA', 'shipping'),
(2, 1, '123 Maple St', 'Springfield', 'IL', '62704', 'USA', 'billing'),

(3, 2, '456 Oak Ave', 'Raleigh', 'NC', '27601', 'USA', 'shipping'),
(4, 2, '789 Pine Rd', 'Durham', 'NC', '27701', 'USA', 'billing'),

(5, 3, '101 Elmwood Dr', 'Austin', 'TX', '73301', 'USA', 'shipping'),
(6, 3, '101 Elmwood Dr', 'Austin', 'TX', '73301', 'USA', 'billing'),

(7, 4, '321 Birch Blvd', 'Denver', 'CO', '80202', 'USA', 'shipping'),
(8, 4, '900 Cedar Ave', 'Boulder', 'CO', '80301', 'USA', 'billing'),

(9, 5, '654 Cedar Dr', 'Seattle', 'WA', '98101', 'USA', 'shipping'),
(10, 5, '654 Cedar Dr', 'Seattle', 'WA', '98101', 'USA', 'billing'),

(11, 6, '111 Walnut Ln', 'Boston', 'MA', '02108', 'USA', 'shipping'),
(12, 6, '212 Beacon St', 'Cambridge', 'MA', '02139', 'USA', 'billing'),

(13, 7, '222 Chestnut Ct', 'Chicago', 'IL', '60601', 'USA', 'shipping'),
(14, 7, '222 Chestnut Ct', 'Chicago', 'IL', '60601', 'USA', 'billing'),

(15, 8, '333 Poplar Way', 'Miami', 'FL', '33101', 'USA', 'shipping'),
(16, 8, '444 Palm Ave', 'Orlando', 'FL', '32801', 'USA', 'billing'),

(17, 9, '555 Ash Ter', 'Phoenix', 'AZ', '85001', 'USA', 'shipping'),
(18, 9, '555 Ash Ter', 'Phoenix', 'AZ', '85001', 'USA', 'billing'),

(19, 10, '600 Sycamore Cir', 'Atlanta', 'GA', '30301', 'USA', 'shipping'),
(20, 10, '700 Peach St', 'Savannah', 'GA', '31401', 'USA', 'billing'),

(21, 11, '666 Dogwood St', 'San Diego', 'CA', '92101', 'USA', 'shipping'),
(22, 11, '666 Dogwood St', 'San Diego', 'CA', '92101', 'USA', 'billing'),

(23, 12, '777 Redwood Rd', 'Portland', 'OR', '97201', 'USA', 'shipping'),
(24, 12, '888 Pine Grove', 'Eugene', 'OR', '97401', 'USA', 'billing'),

(25, 13, '888 Spruce Ave', 'Minneapolis', 'MN', '55401', 'USA', 'shipping'),
(26, 13, '888 Spruce Ave', 'Minneapolis', 'MN', '55401', 'USA', 'billing'),

(27, 14, '999 Fir Dr', 'New York', 'NY', '10001', 'USA', 'shipping'),
(28, 14, '1001 Pine St', 'Brooklyn', 'NY', '11201', 'USA', 'billing'),

(29, 15, '1000 Elm St', 'Los Angeles', 'CA', '90001', 'USA', 'shipping'),
(30, 15, '1000 Elm St', 'Los Angeles', 'CA', '90001', 'USA', 'billing');

INSERT INTO routines (user_id, name, description)
VALUES
(1, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(1, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(2, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(2, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(3, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(3, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(4, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(4, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(5, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(5, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(6, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(6, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(7, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(7, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(8, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(8, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(9, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(9, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(10, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(10, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(11, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(11, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(12, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(12, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(13, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(13, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(14, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(14, 'Evening Skincare', 'Nightly routine to refresh and repair skin'),
(15, 'Morning Skincare', 'Daily morning routine for glowing skin'),
(15, 'Evening Skincare', 'Nightly routine to refresh and repair skin');

INSERT INTO routine_steps (routine_id, step_number, product_id, instructions) VALUES
(1, 1, 10, 'Apply cleanser to wet face and rinse off.'),
(1, 2, 15, 'Use toner with cotton pad all over face.'),
(1, 3, 20, 'Apply moisturizer evenly on face and neck.'),

(3, 1, 10, 'Apply cleanser to wet face and rinse off.'),
(3, 2, 25, 'Use vitamin C serum for brightening.'),
(3, 3, 20, 'Apply moisturizer evenly on face and neck.'),

(5, 1, 30, 'Use gentle cleanser to wash face.'),
(5, 2, 15, 'Apply toner with cotton pad.'),
(5, 3, 20, 'Finish with moisturizer.'),

(7, 1, 10, 'Cleanse face thoroughly.'),
(7, 2, 15, 'Tone skin gently.'),
(7, 3, 35, 'Apply sunscreen for protection.'),

(9, 1, 10, 'Cleanse face gently.'),
(9, 2, 25, 'Use vitamin C serum.'),
(9, 3, 20, 'Apply moisturizer.'),

(11, 1, 10, 'Apply cleanser to wet face.'),
(11, 2, 15, 'Tone skin.'),
(11, 3, 35, 'Apply sunscreen.'),

(13, 1, 30, 'Gentle cleanser application.'),
(13, 2, 25, 'Vitamin C serum for glow.'),
(13, 3, 20, 'Moisturizer application.'),

(15, 1, 10, 'Cleanse face.'),
(15, 2, 15, 'Tone skin.'),
(15, 3, 35, 'Apply sunscreen.'),

-- Makeup remover, Cleanser, Night cream
(2, 1, 40, 'Remove makeup with gentle remover.'),
(12, 1, 40, 'Makeup remover usage.'),
(12, 2, 30, 'Cleanse skin.'),
(12, 3, 50, 'Apply serum.'),

(14, 1, 40, 'Remove makeup.'),
(14, 2, 10, 'Cleanser.'),
(14, 3, 45, 'Night cream.'),

(16, 1, 40, 'Makeup removal.'),
(16, 2, 30, 'Gentle cleanser.'),
(16, 3, 50, 'Repair serum.');

INSERT INTO shopping_cart (user_id) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO shopping_cart_items (cart_id, product_id, quantity) VALUES
(1, 10, 2),
(1, 15, 1),
(2, 20, 3),
(3, 10, 1),
(3, 25, 2),
(3, 30, 1),
(4, 35, 1),
(5, 15, 2),
(5, 20, 1),
(5, 25, 1);

INSERT INTO orders (user_id, status, total_amount, shipping_address_id, billing_address_id)
VALUES
(1, 'processing', 59.97, 1, 1),
(2, 'shipped', 120.00, 3, 3),
(3, 'pending', 85.00, 5, 5);

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES
(1, 10, 1, 19.99),
(1, 15, 2, 19.99),
(2, 20, 3, 20.00),
(2, 25, 2, 20.00),
(3, 30, 1, 25.00),
(3, 10, 2, 30.00);

-- Reset sequences to max(id) for identity columns
SELECT setval(pg_get_serial_sequence('categories','id'), COALESCE((SELECT MAX(id) FROM categories), 1));
SELECT setval(pg_get_serial_sequence('products','id'), COALESCE((SELECT MAX(id) FROM products), 1));
SELECT setval(pg_get_serial_sequence('users','id'), COALESCE((SELECT MAX(id) FROM users), 1));
SELECT setval(pg_get_serial_sequence('addresses','id'), COALESCE((SELECT MAX(id) FROM addresses), 1));
SELECT setval(pg_get_serial_sequence('shopping_cart','id'), COALESCE((SELECT MAX(id) FROM shopping_cart), 1));
SELECT setval(pg_get_serial_sequence('shopping_cart_items','id'), COALESCE((SELECT MAX(id) FROM shopping_cart_items), 1));
SELECT setval(pg_get_serial_sequence('orders','id'), COALESCE((SELECT MAX(id) FROM orders), 1));
SELECT setval(pg_get_serial_sequence('order_items','id'), COALESCE((SELECT MAX(id) FROM order_items), 1));
SELECT setval(pg_get_serial_sequence('payments','id'), COALESCE((SELECT MAX(id) FROM payments), 1));
SELECT setval(pg_get_serial_sequence('routines','id'), COALESCE((SELECT MAX(id) FROM routines), 1));
SELECT setval(pg_get_serial_sequence('routine_steps','id'), COALESCE((SELECT MAX(id) FROM routine_steps), 1));

COMMIT;
