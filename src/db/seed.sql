INSERT INTO categories (id, name, tax_applicable, tax_percentage)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Beverages',
    true,
    18
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Wellness Services',
    false,
    NULL
  );

INSERT INTO items (
  id,
  category_id,
  name,
  pricing_type,
  pricing_config
)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '11111111-1111-1111-1111-111111111111',
  'Coffee',
  'STATIC',
  '{"price": 200}'
);

INSERT INTO items (
  id,
  category_id,
  name,
  pricing_type,
  pricing_config
)
VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '11111111-1111-1111-1111-111111111111',
  'Fresh Juice',
  'DISCOUNT',
  '{
    "base_price": 250,
    "discount_type": "PERCENT",
    "discount_value": 20
  }'
);

INSERT INTO items (
  id,
  category_id,
  name,
  pricing_type,
  pricing_config
)
VALUES (
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '11111111-1111-1111-1111-111111111111',
  'Breakfast Combo',
  'DYNAMIC',
  '{
    "windows": [
      { "start": "08:00", "end": "11:00", "price": 199 },
      { "start": "17:00", "end": "20:00", "price": 249 }
    ]
  }'
);

INSERT INTO items (
  id,
  category_id,
  name,
  pricing_type,
  pricing_config
)
VALUES (
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '22222222-2222-2222-2222-222222222222',
  'Yoga Session',
  'STATIC',
  '{"price": 500}'
);

INSERT INTO item_availability (
  item_id,
  day_of_week,
  start_time,
  end_time
)
VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 1, '10:00', '11:00'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 1, '17:00', '18:00');

INSERT INTO item_bookings (
  item_id,
  booking_date,
  start_time,
  end_time
)
VALUES (
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '2026-01-19', -- Monday
  '10:00',
  '11:00'
);
