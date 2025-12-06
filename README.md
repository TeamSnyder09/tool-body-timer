# Tool Body Timer Web Application

## Overview
The Tool Body Timer Web Application is designed to track the time since the installation of tools on machines. This application provides a user-friendly interface for managing tools and machines, allowing users to monitor tool usage effectively.

## Features
- Track tool usage time since installation.
- Manage tools and machines through a web interface.
- RESTful API for backend operations.
- Error handling middleware for consistent error responses.

## Project Structure
```
tool-body-timer-web
├── src
│   ├── server
│   │   ├── index.ts               # Entry point for the server application
│   │   ├── routes
│   │   │   ├── tools.ts           # Routes for tool-related operations
│   │   │   └── machines.ts        # Routes for machine-related operations
│   │   ├── controllers
│   │   │   ├── toolController.ts   # Controller for tool operations
│   │   │   └── machineController.ts # Controller for machine operations
│   │   ├── services
│   │   │   ├── trackerService.ts    # Service for tracking tool usage
│   │   │   └── storageService.ts    # Service for data storage and retrieval
│   │   └── middleware
│   │       └── errorHandler.ts      # Middleware for error handling
│   ├── client
│   │   ├── index.html              # Main HTML file for the client-side application
│   │   ├── styles
│   │   │   └── main.css            # CSS styles for the client-side application
│   │   ├── scripts
│   │   │   ├── app.ts              # Main TypeScript file for client-side logic
│   │   │   └── api.ts              # API call functions for server communication
│   │   └── components
│   │       ├── ToolList.ts         # Component for displaying a list of tools
│   │       └── MachineView.ts      # Component for displaying machine information
│   └── types
│       └── index.ts                # TypeScript interfaces and types
├── package.json                    # npm configuration file
├── tsconfig.json                   # TypeScript configuration file
└── README.md                       # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tool-body-timer-web
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm run start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.