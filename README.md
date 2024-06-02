
# CharmySalesLog

CharmySalesLog is an application designed to help the staff at Charmy Bottle Shop easily log daily sales reports and provide shop owners with detailed sales trends and amounts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/jeongdari/CharmySalesLog.git
    cd CharmySalesLog
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the Expo development server:

    ```bash
    npm start
    # or
    yarn start
    ```

4. Follow the instructions in the terminal to run the app on an Android/iOS simulator or a physical device.

## Usage

### Running on Android

```bash
npm run android
# or
yarn android
```

### Running on iOS

```bash
npm run ios
# or
yarn ios
```

### Running on Web

```bash
npm run web
# or
yarn web
```

## API Documentation

The API provides endpoints for user authentication and sales logging. Here is a brief overview:

### Authentication

- **User Signup**
  - Endpoint: `/api/auth/signup`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "username": "johndoe",
      "password": "password123",
      "email": "johndoe@example.com",
      "phone_number": "1234567890"
    }
    ```
  - Responses:
    - `201`: User created successfully
    - `400`: Bad request
    - `500`: Server error

- **User Login**
  - Endpoint: `/api/auth/login`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
  - Responses:
    - `200`: Login successful
    - `400`: Bad request
    - `500`: Server error

### Sales

- **Fetch a Sales Record**
  - Endpoint: `/api/sales/get`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "date": "2024-01-01"
    }
    ```
  - Responses:
    - `200`: Sales record fetched successfully
    - `500`: Server error

- **Update a Sales Record**
  - Endpoint: `/api/sales/update`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "date": "2024-01-01",
      "card_payment_amt": 100.00,
      "cash_payment_amt": 50.00
    }
    ```
  - Responses:
    - `200`: Sales record updated successfully
    - `500`: Server error

- **Edit a Sales Record**
  - Endpoint: `/api/sales/edit`
  - Method: `PUT`
  - Request Body:
    ```json
    {
      "date": "2024-01-01",
      "card_payment_amt": 100.00,
      "cash_payment_amt": 50.00
    }
    ```
  - Responses:
    - `200`: Sales record edited successfully
    - `404`: No sales record found to update for the specified date
    - `500`: Server error

- **Delete a Sales Record**
  - Endpoint: `/api/sales/delete`
  - Method: `DELETE`
  - Request Body:
    ```json
    {
      "date": "2024-01-01"
    }
    ```
  - Responses:
    - `200`: Sales record deleted successfully
    - `500`: Server error

- **Get Sales Records**
  - Endpoint: `/api/sales/list`
  - Method: `GET`
  - Query Parameters:
    - `start_date`: Start date for the sales records (required)
    - `end_date`: End date for the sales records (required)
  - Responses:
    - `200`: Sales records retrieved successfully
    - `500`: Server error

- **Get Latest Sales Record**
  - Endpoint: `/api/sales/latest`
  - Method: `GET`
  - Responses:
    - `200`: Latest sales record retrieved successfully
    - `500`: Server error

### Reports

- **Generate Report**
  - Endpoint: `/api/reports/generate`
  - Method: `GET`
  - Query Parameters:
    - `start_date`: Start date for the report (required)
    - `end_date`: End date for the report (optional)
    - `range`: Range for the report (daily, weekly, monthly) (optional)
  - Responses:
    - `200`: Report generated successfully
    - `400`: Invalid start_date
    - `500`: Internal server error

- **Get Recent Sales Data**
  - Endpoint: `/api/reports/recent`
  - Method: `GET`
  - Responses:
    - `200`: Recent sales data retrieved successfully
    - `500`: Internal server error

- **Get Weekly Sales Data**
  - Endpoint: `/api/reports/weekly-sales`
  - Method: `GET`
  - Responses:
    - `200`: Weekly sales data retrieved successfully
    - `500`: Internal server error

- **Get Monthly Sales Data**
  - Endpoint: `/api/reports/monthly-sales`
  - Method: `GET`
  - Responses:
    - `200`: Monthly sales data retrieved successfully
    - `500`: Internal server error

## License

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Author

Danny Jeong
