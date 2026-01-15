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

  CHECK (start_time < end_time)
);
