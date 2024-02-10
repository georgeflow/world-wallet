# **worldwallet - Enhanced Frontend Edition**

A state-of-the-art financial tracker for the international individual, now featuring a TypeScript-enhanced frontend. It connects your diverse bank accounts across the globe and updates your financial status in real-time.

## **Overview**

The **`worldwallet`** project has been given a significant upgrade on the frontend. The JavaScript code has been meticulously converted to TypeScript, enhancing type safety and developer experience. This update, along with added tests, improved context management, and authentication features, positions **`worldwallet`** at the forefront of modern financial tracking applications.

## **What's New in the Frontend**

- Transitioned the frontend codebase from JavaScript to TypeScript for improved type safety and easier maintenance.
- Added comprehensive tests to ensure the frontend components behave as expected.
- Refined context handling to provide a more efficient state management across the React components.
- Strengthened user authentication to secure access to financial data.
- Generalized Plaid components for better reusability and adaptability in different parts of the app.

## **Original Concept**

**`worldwallet`** is designed as a net worth tracker for those with a global lifestyle. It allows you to connect and monitor bank accounts from supported countries, offering a unified view of your financial standing.

## **Supported Countries**

- United States
- Spain
- United Kingdom
  
- Note: Accessing real bank account data requires a paid Plaid API subscription.

## **Technologies – Frontend Focus**

- TypeScript
- React
- Reusable Plaid components

## **Installation and Setup – Frontend**

### **Prerequisites**

- Node.js must be installed on your machine.
- A MongoDB instance running for backend connectivity.
- Plaid Client ID and Secret key for financial data access.

### **Installation Steps**

1. **Fork and clone the repository:**

```bash

git clone git@github.com:georgeflow/world-wallet.git

```

1. **Install the frontend dependencies:**

Navigate to the client directory:

```bash

cd client
npm install

```

### **Running the Frontend**

Execute the following command to start the frontend development server:

```bash

npm start

```

Your enhanced **`worldwallet`** frontend will now be running at **`localhost:3000`**.
