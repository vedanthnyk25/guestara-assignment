import { pool } from "../../config/db.js";

export async function getAvailableBookingSlots(itemId, date) {
  const d= new Date(date);
  const {rows}= await pool.query(
    `
    SELECT start_time, end_time
    FROM item_availability
    WHERE item_id = $1
    AND day_of_week = $2;
    `,
    [itemId, d.getDay()]
  );

  return rows;
}

export async function getBookingsForItemOnDate(itemId, date) {
  const { rows } = await pool.query(
    `
    SELECT start_time, end_time
    FROM item_bookings
    WHERE item_id = $1
    AND booking_date = $2;
    `,
    [itemId, date]
  );

  return rows;
}

export async function checkBookingConflict(itemId, date, startTime, endTime) {

  const { rows } = await pool.query(
    `
    SELECT 1
    FROM item_bookings
    WHERE item_id = $1
    AND booking_date = $2
    AND NOT (
    end_time <= $3 OR start_time >= $4
    )
    LIMIT 1
    `,
    [itemId, date, startTime, endTime]
  );
  return rows.length > 0;
}

export async function createBooking(itemId, date, startTime, endTime) {
  const { rows } = await pool.query(
    `
    INSERT INTO item_bookings (
      item_id,
      booking_date,
      start_time,
      end_time
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `,
    [itemId, date, startTime, endTime]
  );

  return rows[0];
}

