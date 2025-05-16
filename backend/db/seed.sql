-- Dummy data

-- restaurants
INSERT INTO restaurants (name, location)
VALUES
  ('Sakura Sushi House', '123 Cherry Blossom St, Tokyo'),
  ('Bella Pasta', '45 Roma Lane, Rome'),
  ('The Burger Forge', '789 Grill Ave, New York'),
  ('Curry Kingdom', '67 Spice Rd, Mumbai'),
  ('Pho Ever', '22 Noodle Blvd, Hanoi');

-- products 
INSERT INTO products (restaurant_id, name, description, price, image_url)
VALUES
  -- Sakura Sushi House
  (1, 'Salmon Nigiri', 'Freshly sliced salmon over seasoned rice.', 100, 'images/salmon_nigiri.jpg'),
  (1, 'Tuna Roll', 'Classic tuna maki roll with seaweed wrap.', 90, 'images/tuna_roll.jpg'),

  -- Bella Pasta
  (2, 'Spaghetti Carbonara', 'Creamy pasta with pancetta and parmesan.', 180, 'images/spaghetti_carbonara.jpg'),
  (2, 'Lasagna', 'Layered pasta with beef, cheese, and tomato sauce.', 200, 'images/lasagna.jpg'),

  -- The Burger Forge
  (3, 'Classic Burger', 'Grilled beef patty with cheddar, lettuce, and tomato.', 160, 'images/burger.jpg'),
  (3, 'Classic Pizza', 'Classical freshly baked pizza.', 250, 'images/pizza.jpg'),

  -- Curry Kingdom
  (4, 'Butter Chicken', 'Creamy tomato-based chicken curry.', 190, 'images/butter_chicken.jpg'),
  (4, 'Paneer Tikka Masala', 'Grilled paneer in rich, spiced curry.', 170, 'images/paneer_tikka.jpg'),

  -- Pho Ever
  (5, 'Beef Pho', 'Vietnamese noodle soup with beef slices and herbs.', 150, 'images/beef_pho.jpg'),
  (5, 'Spring Rolls', 'Fresh rolls with shrimp, vermicelli, and peanut sauce.', 80, 'images/spring_rolls.jpg');

