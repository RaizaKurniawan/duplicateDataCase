# Duplicate Data Case Using Playwright & Allure


This document contain the instruction of how to run the project

Kindly note:
The folder structure should be like this

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
