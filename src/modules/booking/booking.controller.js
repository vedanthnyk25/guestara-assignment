import asyncHandler from '../../utils/asyncHandler.js';

import {
  getAvailableBookingSlots,
  getBookingsForItemOnDate,
  checkBookingConflict,
  createBooking
} from './booking.repository.js';

function overlaps(slot, booking) {
  return (booking.end_time > slot.start_time && booking.start_time < slot.end_time);
}

export const getItemAvailability= asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  if(!date) {
    return res.status(400).json({ message: "Date query parameter is required" });
  }

  const availableSlots = await getAvailableBookingSlots(id, date);
  const existingBookings = await getBookingsForItemOnDate(id, date);

  const freeSlots= availableSlots.filter(slot=> {
    return !existingBookings.some(booking=> overlaps(slot, booking));
  });

  res.json({ 
    date,
    slots: freeSlots });
});

export const createItemBooking= asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date, startTime, endTime } = req.body;

  if(!date || !startTime || !endTime) {
    return res.status(400).json({ message: "date, startTime and endTime are required in the request body" });
  }

  if(new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ message: "startTime must be before endTime" });
  }

  const hasConflict = await checkBookingConflict(id, date, startTime, endTime);
  if(hasConflict) {
    return res.status(409).json({ message: "Booking conflict detected for the requested time slot" });
  }

  const booking = await createBooking(id, date, startTime, endTime);

  res.status(201).json({ 
    message: "Booking created successfully",
    bookingId: booking.id 
  });
});
