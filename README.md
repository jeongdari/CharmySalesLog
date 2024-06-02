
# Charmy Sales Log Application

CharmySalesLog is an application designed to help the staff at Charmy Bottle Shop easily log daily sales reports and provide shop owners with detailed sales trends and amounts.

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Reporting Issues](#reporting-issues)
- [License](#license)
- [Author](#author)

## Purpose

The purpose of the CharmySalesLog application is to streamline the process of logging daily sales for staff at the Charmy Bottle Shop and to provide shop owners with an easy way to view sales trends and details. This helps in better management and analysis of the shop's sales data.

## Features

- User authentication (signup and login)
- Log daily sales reports
- View and edit sales records
- Delete sales records
- Generate sales reports for specified date ranges
- View recent, weekly, and monthly sales data
- Dark mode support
- Delete and edit user profile information
- Responsive design for mobile and web

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

## Dependencies

The project relies on various dependencies which are listed in the `package.json` file. Here are some key dependencies and their installation:

```json
"dependencies": {
    "@react-native-async-storage/async-storage": "^1.23.1",
    "@react-native-community/datetimepicker": "^8.0.1",
    "@react-navigation/material-top-tabs": "^6.6.13",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/stack": "^6.3.29",
    "@shopify/react-native-skia": "^1.2.3",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "d3": "^7.9.0",
    "expo": "~51.0.9",
    "expo-app-loading": "^2.1.1",
    "expo-auth-session": "~5.5.2",
    "expo-crypto": "~13.0.2",
    "expo-router": "^3.5.14",
    "expo-status-bar": "~1.12.1",
    "expo-system-ui": "~3.0.4",
    "jsonwebtoken": "^9.0.2",
    "jwt-decode": "^4.0.0",
    "npm-license-crawler": "^0.2.1",
    "react": "18.2.0",
    "react-native": "0.74.1",
    "react-native-chart-kit": "^6.12.0",
    "react-native-datepicker": "^1.7.2",
    "react-native-gesture-handler": "^2.16.2",
    "react-native-pager-view": "6.3.0",
    "react-native-reanimated": "~3.10.1",
    "react-native-safe-area-context": "4.10.1",
    "react-native-screens": "3.31.1",
    "react-native-svg": "^15.2.0",
    "react-native-svg-charts": "^5.4.0",
    "react-native-tab-view": "^3.5.2",
    "react-native-toast-message": "^2.2.0",
    "swagger-ui-express": "^5.0.1",
    "victory-native": "^40.2.0"
  }
```

To install these dependencies, run:

```bash
npm install
# or
yarn install
```

## Architecture

The application is built using React Native and Expo. It follows a component-based architecture where each screen and component is modular and reusable. Here are some key parts of the architecture:

- **Expo**: Used for development and building the application.
- **React Navigation**: Manages navigation and routing within the app.
- **AsyncStorage**: For storing data locally on the device.
- **JWT Authentication**: For secure user authentication.
- **D3 and Victory**: For data visualization and charts.
- **Swagger**: For API documentation.

## Contributing

Contributions are welcome! To contribute to the development of CharmySalesLog:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Open a pull request with a detailed description of your changes.

## Reporting Issues

If you encounter any issues or bugs, please report them by creating an issue in the [GitHub Issues](https://github.com/jeongdari/CharmySalesLog/issues) section of the repository. Provide as much detail as possible to help us resolve the issue quickly.

## License

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Author

Danny Jeong
