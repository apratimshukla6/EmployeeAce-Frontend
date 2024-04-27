<div align="center">
  <br />
  <p>
    <a href="https://employeeace.apratim.me/"><img src="https://i.imgur.com/3V3ys1O.png" width="500" alt="employeeace" /></a>
  </p>
  <br />
</div>

# About
Live URL: <a href="https://employeeace.apratim.me/graphql">https://employeeace.apratim.me</a>

EmployeeAce Frontend is a React application designed to streamline employee performance management. It interfaces seamlessly with the <a href="https://github.com/apratimshukla6/EmployeeAce">EmployeeAce GraphQL API</a>, facilitating the creation, modification, and deletion of employee records. Users can input data across three specific metrics, which the app uses to compute and update scores based on the presence of designated positive keywords in feedback.

### Features
- **Employee Record Management**: Create, read, update, and delete employee records directly through the UI.
- **Dynamic Score Computation**: Automatically recalculates scores when feedback on metrics is modified.
- **Sorting Capabilities**: Offers case-insensitive sorting of employee records in both ascending and descending order.
- **Search Functionality**: Enables case-insensitive searching of employee records by name.
- **Employee Insights**: EmployeeAce calculates and displays the total number of employee records, alongside key performance indicators such as the average and median scores, offering valuable insights into overall workforce effectiveness.
- **Responsive Design**: Optimized for mobile devices, ensuring a seamless experience across all platforms.
- **Continuous Integration and Deployment**: Utilizes CI/CD principles for efficient development cycles via Vercel.
- **Enhanced Security**: Incorporates SSL/DNS/DDoS protection through Cloudflare, safeguarding data integrity and application availability.

### Preview
<img src="https://i.imgur.com/EPfV00G.png">


### EmployeeAce Frontend Setup Guide

This guide details the necessary steps for setting up the EmployeeAce frontend, a React application, on your local development environment.

## Prerequisites
- Node.js v16.20.2

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/apratimshukla6/EmployeeAce-Frontend.git
   cd EmployeeAce-Frontend
   ```

2. **Set Node.js version (if you're using nvm or npx):**
   ```bash
   npx node@16.20.2 --version # This command will use Node.js v16.20.2 temporarily
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

## Building the Application

For production, you'll want to build the application:
```bash
npm run build
```
This command builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Additional Information

Make sure your development environment is properly set up to communicate with the EmployeeAce backend API, and check your network configurations if you encounter any connectivity issues.
