# Auction System

This is a full-stack web application for an online auction system, consisting of a React.js front-end and a Node.js/Express.js back-end, with MongoDB as the database.

## Features

- User Registration and Login (with JWT authentication)
- Create, Update, Delete, and View Auctions
- Place Bids on Auctions
- Track Bid History for Each Auction
- API documentation with Swagger

## Tech Stack

- *Front-end*: React.js
- *Back-end*: Node.js, Express.js
- *Database*: MongoDB
- *Authentication*: JWT (JSON Web Token)
- *API Documentation*: Swagger
- *Styling*: Material-UI (MUI)

## Installation and Setup

Follow these steps to get the application running on your local machine:

### Prerequisites

Make sure you have the following installed:
- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)

### Backend (Node.js/Express.js)

1. Clone the repository to your local machine:
    bash
    git clone https://github.com/suryadevsingh123/Auction-Platform.git
    

2. Navigate to the backend folder:
    bash
    cd Auction-Platform/biddingPlatformServer
    
3. Install the required dependencies:
    bash
    npm install

4.  Run the server:
    npm start
    
### Api Documentation
1.  Generate Swagger documentation
    http://localhost:3001/api-docs. 
    change the localhost if you have different one.
    
### Basic Functionality
1. there is no initial data for Auctions so once you add auction after login then only you can see the Auction to perform.
2. To see the history of bidding you have to click on bidding image.
3. To perform update or delete functionality you have to go to /myAuctions.
4. rest is on normal flow.
