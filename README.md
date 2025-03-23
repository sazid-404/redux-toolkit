# Redux Toolkit Video Fetcher Assignment

This project demonstrates how to use Redux Toolkit in a Node.js environment to fetch and display video data from an API. The assignment involves two sequential API calls:

- First, fetching a random video object.
- Then, using the video's tags to fetch related videos and sorting them by the number of views in descending order.

## Features

- **Random Video Fetch:** Retrieves a random video object from the API.
- **Related Videos:** Uses the video's `tags` to search for related videos.
- **Sorting:** Sorts the related videos by their view counts (highest first).
- **Redux Toolkit & Async Thunks:** Uses Redux Toolkit to manage asynchronous actions and state.
- **Logging:** Utilizes `redux-logger` middleware to log every action and state change to the console for easier debugging.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. **Clone or Download the Repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

## You can install them all by running:

bash
Copy
npm install @reduxjs/toolkit redux-logger axios

Project Structure
index.js: Main entry point where the Redux store, async thunks, and API calls are defined.

package.json: Contains project metadata and dependency list.

node_modules/: Directory containing installed npm packages (generated after running npm install).

## How to Run the Application

Ensure the API Server is Running:

## The API server should be available at:

bash
Copy
http://localhost:9000/videos
Verify that the server is up and running before starting your application.

## Run the Application:

In your project directory, run:

bash
Copy
node index.js
Observe the Output:

The first API call fetches a random video and extracts its tags.

The second API call uses these tags to fetch related videos.

Related videos are then sorted by view count (descending) and logged to the console via redux-logger.

## Code Explanation

## Async Thunks:

fetchVideo: Makes an API call to fetch a random video object.

fetchRelatedVideos: Accepts an array of tags, constructs a query string (using tags_like), and fetches related videos.

## Redux Slice:

Manages the state of the video and related videos.

Handles asynchronous actions (pending, fulfilled, rejected) to update the state.

## Store Configuration:

The Redux store is set up using Redux Toolkit's configureStore.

redux-logger middleware is included to log all dispatched actions and state changes, aiding in debugging.

---

This README file covers all the details needed to understand, set up, and run the project. Feel free to customize it further to suit your project needs.
