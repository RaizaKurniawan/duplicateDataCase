# Duplicate Data Case Using Playwright & Allure


This document contain: 
* Scenario 
* Tech Stack
* Instruction how to run the project
* Running Test

Kindly note:
* The folder structure should be like this

```bash
duplicateDataCase/
│
├─ tests/
│   ├─ booking-validation.spec.js
│
├─ data/
│   ├─ bookingData.json
│   ├─ venueSchedule.json
│
├─ playwright.config.js
├─ package.json
└─ README.md


```

# Booking Data Validation Test

Automated validation using Playwright + Allure Reporting.
This test suite validates the integrity of booking data by ensuring:

* No duplicate bookings exist for the same venue, date, and time.

* Booking prices are consistent with the defined venue schedule.

## Test Scenarios
### **SCENARIO 1 — Detect Duplicate Booking**

Objective:
* Ensure that there are no double bookings for the same venue_id, date, start, and end time.

Details:

* The test iterates through all records in bookingData.json.

* Each booking slot combination (venue_id + date + start + end) is tracked in a Set.

* If a combination already exists, it is marked as a duplicate.

Expected Result: 
* No duplicates found (hasDuplicate = false).
### 
### **SCENARIO 2 — Validate Price Consistency**

Objective:
* Ensure that the price in booking data matches the official price listed in venueSchedule.json.

Details:

* Each booking is compared against the corresponding venue schedule.

* A match is required for venue_id, date, start, and end.

* Any mismatch or missing schedule entry causes a test failure.

Expected Result: 
* All booking prices match their schedules.

### 

## Tech Stack

**Automation Framework:** Playwright

**Reporter:** Allure-Playwright


## Installation

Create the folder into your local
```bash
mdkir duplicateDataCase
```
clone the project https://github.com/RaizaKurniawan/duplicateDataCase.git to the duplicateDataCase folder

open terminal

```bash
  cd duplicateDataCase
  
  npm i -D @playwright/test allure-playwright

  npm i -g allure-commandline

  npx playwright Installation
  npm i --save-dev @types/node
  npm i --save-dev fs 
```

Copy paste this script into package.json

```bash
"scripts": {
    "test": "npx playwright test",
    "test:report": "npx playwright test --reporter=line,allure-playwright",
    "allure:serve": "allure serve allure-results"
  },

  ```

  
## Running Tests

To run tests, run the following command

```bash
  npm run test:report
  
  npm run allure:serve
```

## Authors

- [@RaizaKurniawan](https://github.com/RaizaKurniawan)
