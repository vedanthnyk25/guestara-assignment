CREATE TABLE categories (

  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,

  tax_applicable BOOLEAN NOT NULL DEFAULT false,
  tax_percentage NUMERIC(5, 2),

  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CHECK (
    (tax_applicable = false AND tax_percentage IS NULL) OR
    (tax_applicable = true AND tax_percentage IS NOT NULL AND tax_percentage >= 0)
  )
);

CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,

  pricing_type TEXT NOT NULL
    CHECK (pricing_type IN ('STATIC', 'DISCOUNT', 'DYNAMIC')),

  pricing_config JSONB NOT NULL,  

  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE (category_id, name)
);

CREATE TABLE item_tax_override (
  item_id uuid PRIMARY KEY REFERENCES items(id) ON DELETE CASCADE,
  tax_applicable BOOLEAN NOT NULL DEFAULT false,
  tax_percentage NUMERIC(5, 2),

  CHECK (
    (tax_applicable = false AND tax_percentage IS NULL) OR
    (tax_applicable = true AND tax_percentage IS NOT NULL AND tax_percentage >= 0)
  )
);

CREATE TABLE item_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id) ON DELETE CASCADE,  
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,

  CHECK (start_time < end_time),
  UNIQUE (item_id, day_of_week, start_time, end_time)
);

CREATE TABLE item_bookings(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),

  CHECK (start_time < end_time),
);
