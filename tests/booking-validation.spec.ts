import { test, expect } from "@playwright/test";
import fs from "fs";

// Load test data
const bookingData = JSON.parse(fs.readFileSync("./data/bookingData.json", "utf8"));
const venueSchedule = JSON.parse(fs.readFileSync("./data/venueSchedule.json", "utf8"));
const bookingDataNoDuplicate = JSON.parse(fs.readFileSync("./data/bookingDataNoDuplicate.json", "utf8")); // new dataset

type VenueSchedule = {
  venue_id: string;
  date: string;
  start: string;
  end: string;
  price: number;
};

test.describe("Booking Data Validation", () => {
 // --- SCENARIO 1: Detect duplicate booking ---
    test("Detect double booking on same venue & time", async ({}, testInfo) => {
    testInfo.annotations.push({ type: "scenario", description: "Validate duplicate booking detection" });

    const seenSlots = new Set();
    let hasDuplicate = false;

    for (const booking of bookingData) {
        const key = `${booking.venue_id}-${booking.date}-${booking.start}-${booking.end}`;
        if (seenSlots.has(key)) {
        console.warn(`Duplicate booking detected: ${booking.booking_id}`);
        hasDuplicate = true;
        }
        seenSlots.add(key);
    }

    // ✅ Test should fail if duplicates exist
    expect(hasDuplicate, "Duplicate bookings found").toBeFalsy();
    });

  // --- SCENARIO 2: Ensure price consistency ---
  test("Validate price consistency with schedule", async ({}, testInfo) => {
    testInfo.annotations.push({ type: "scenario", description: "Validate booking price matches venue schedule" });

    for (const booking of bookingData) {
      const matchedSchedule: VenueSchedule | undefined = venueSchedule.find(
        (v: VenueSchedule) =>
          v.venue_id === booking.venue_id &&
          v.date === booking.date &&
          v.start === booking.start &&
          v.end === booking.end
      );

      expect(matchedSchedule, `No matching schedule found for ${booking.booking_id}`).toBeTruthy();
      if (matchedSchedule) {
        expect(booking.price, `Price mismatch for ${booking.booking_id}`).toBe(matchedSchedule.price);
      }
    }
  });

  // --- SCENARIO 3: Validate clean data (no duplicates expected) ---
  test("Validate booking dataset without duplicates", async ({}, testInfo) => {
    testInfo.annotations.push({ type: "scenario", description: "Ensure clean dataset has no duplicate booking" });

    const seenSlots = new Set();
    let hasDuplicate = false;

    for (const booking of bookingDataNoDuplicate) {
      const key = `${booking.venue_id}-${booking.date}-${booking.start}-${booking.end}`;
      if (seenSlots.has(key)) {
        hasDuplicate = true;
        console.error(`Unexpected duplicate found in clean data: ${booking.booking_id}`);
      }
      seenSlots.add(key);
    }

    // Expected to PASS because no duplicate exists
    expect(hasDuplicate, "No duplicate should exist in clean dataset").toBeFalsy();
  });
});

// --- Command helper ---
// Run in UI:     npx playwright test tests/booking-validation.spec.ts --headed
// Run headless:  npx playwright test tests/booking-validation.spec.ts
// Generate Allure report:
//   npx allure generate test-results --clean -o allure-report
//   npx allure open allure-report
// Make sure allure is installed globally via:
//   npm i -g allure-commandline
