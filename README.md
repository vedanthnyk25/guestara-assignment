# Guestara Backend Assignment – Pricing, Availability & Booking

This repository contains my submission for the Guestara backend assignment.  
The implementation focuses on **core business logic** : pricing, tax inheritance, availability, and booking rather than CRUD-heavy APIs.

The goal was to design a system that is **correct, explainable, and extensible**, while keeping scope intentionally controlled.

---

## 1. High-Level Architecture

The codebase is structured around **clear domain boundaries**, keeping business logic isolated from HTTP and database concerns.

```bash
src/
├── modules/
│ ├── pricing/ # Pricing resolution logic (core business logic)
│ ├── item/ # Item pricing API orchestration
│ └── booking/ # Availability and booking logic
├── services/
│ └── tax.service.js
├── db/
│ ├── migrations/
│ └── seed.sql
├── utils/
│ ├── asyncHandler.js
│ └── guards.js
├── app.js
└── server.js
```

### Why this structure?
- **Pricing** is isolated because it is revenue-critical and rule-heavy.
- **Booking** is separated because it introduces time-based constraints and conflict handling.
- **Repositories** encapsulate all database access, keeping controllers thin.
- Business logic is implemented as pure functions where possible, making behavior easy to reason about.

---

## 2. Data Modeling Decisions

### Pricing Configuration (JSONB)
Pricing rules are stored in a `pricing_config` JSONB column.

**Why JSONB?**
- Different pricing types require different configuration shapes.
- Avoids frequent schema changes.
- Keeps pricing logic in code instead of inferred database structure.

---

### Tax Inheritance
Tax follows a clear hierarchy:
1. Item-level tax override (if present)
2. Category-level tax
3. No tax

**Why this approach?**
- Avoids duplicating tax data across items.
- Category tax changes automatically apply to all inheriting items.
- Makes inheritance explicit and predictable.

---

### Availability & Booking
Two separate tables are used:
- `item_availability` – defines when an item can be booked
- `item_bookings` – stores confirmed bookings

**Why separate tables?**
- Availability is static and predefined.
- Bookings are dynamic and time-specific.
- Clear separation simplifies conflict detection and reasoning.

---

## 3. Pricing Engine

Pricing is resolved **at request time** and no derived prices are stored.

### Supported Pricing Types

#### Static Pricing
- Fixed base price
- Optional tax applied

#### Discount Pricing
- Percentage or flat discount
- Discount applied before tax
- Final price never goes below zero

#### Dynamic Pricing
- Time-window–based pricing
- Item is available only during configured windows
- Outside all windows, the item is unavailable

### Pricing Endpoint
 #### GET /items/:id/price

 Response includes:
- Applied pricing rule
- Base price
- Tax
- Final payable price

This design ensures pricing remains correct even if tax or pricing rules change.

---
## 4. Tax Handling

Tax resolution is performed **after pricing resolution** and follows a simple precedence:
1. Item-level override
2. Category-level tax
3. No tax

This keeps pricing and tax concerns independent and easier to maintain.

---

## 5. Availability & Booking

Booking-related APIs are exposed under the `/bookings` namespace.

### Availability
#### GET /bookings/:id/availability?date=YYYY-MM-DD

Flow:
1. Derive day of week from the date
2. Fetch predefined availability slots
3. Fetch existing bookings for the date
4. Subtract overlapping bookings
5. Return remaining free slots

---

### Booking
#### POST /bookings/:id/book
Before creating a booking:
- The system checks for overlapping bookings
- Conflicts are rejected with `409 Conflict`

This ensures a time slot cannot be double-booked.

---

## 6. Assumptions & Tradeoffs

To keep the implementation focused, the following assumptions were made:

- Bookings are anonymous (no users or authentication)
- Bookings are for a single item and a single day
- Availability slots are predefined
- No booking cancellation or modification
- Server-local time is used (no timezone normalization)
- Clients request valid availability slots when booking

These decisions were intentional to prioritize **business logic correctness** over feature breadth.

---

## 7. What Was Intentionally Left Out

The following were consciously excluded:

- CRUD APIs for items and categories
- User accounts and authentication
- Payments and order management
- Booking cancellation and rescheduling
- Pagination and search
- Advanced concurrency handling

Each of these would be natural extensions in a production system, but were excluded to avoid shallow or rushed implementations.

---

## 8. Running the Project Locally

### Prerequisites
- Docker
- Docker Compose

### Setup
```bash
docker compose down -v
docker compose up --build
```
#### Health Check
GET http://localhost:3000/health

## Reflections
### Database choice
PostgreSQL provides strong relational integrity, ACID guarantees for booking conflicts, and JSONB support for flexible pricing configurations. This combination fits both structured relationships in this project and dynamic business rules well.

### Learnings
- Designing business logic before APIs leads to clearer and safer systems.
- Separating architectural layers helps isolate responsibilities and simplifies debugging. 
- Consciously limiting scope often results in higher-quality code.

### Challenge
Designing pricing and availability logic without storing derived values was the most challenging part, as it required reasoning about time windows, overlap detection, and tax application entirely at request time.

###  Improvements
- Wrap booking creation in transactions for stronger concurrency guarantees
- Validate booking requests against availability slots at write time
- Introduce authentication and user-specific bookings
- Expand dynamic pricing rules (e.g., tiered or demand-based pricing)
