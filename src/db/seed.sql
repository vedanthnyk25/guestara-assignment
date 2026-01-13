INSERT INTO categories (name, tax_applicable, tax_percentage)
VALUES ('Beverages', true, 18);

INSERT INTO items (
  category_id,
  name,
  pricing_type,
  pricing_config
)
VALUES (
  (SELECT id FROM categories WHERE name = 'Beverages'),
  'Coffee',
  'STATIC',
  '{"price":200}'
);
