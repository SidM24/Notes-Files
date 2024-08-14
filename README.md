# Task Pulse

Task Pulse is a MERN stack application designed to help users efficiently manage notes, memos, and important image files. With an intuitive interface, Task Pulse offers seamless creation, editing, and storage of content across the cloud, ensuring that your data is always accessible whenever and wherever you need it.

## Features

- **Create & Manage Notes**: Easily create and organize notes and memos.
- **Image Storage**: Upload and store important image files alongside your notes.
- **Edit & Delete**: Update and delete content with ease.
- **Cloud Storage**: All your data is stored securely in the cloud, ensuring accessibility and persistence.
- **User Authentication**: Secure sign-up and login functionality to keep your data safe.

## Tech Stack

- **MongoDB**: NoSQL database to store user data, notes, and files.
- **Express.js**: Backend framework to handle API requests, authentication and security logic.
- **React.js**: Frontend framework to build a dynamic and responsive user interface.
- **Node.js**: Runtime environment to execute JavaScript code on the server.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/task-pulse.git
   cd Notes-Files
   ```

2. **Install backend dependencies**:

   ```bash
   npm install bcryptjs body-parser cors express express-fileupload express-validator jsonwebtoken mongodb mongoose multer multer-gridfs-storage
   ```

3. **Install frontend dependencies**:

   ```bash
   cd ../
   npm i react
   ```
4. **Set up environment variables**:

   Create a .env file in the backend folder and add the following variables:

   ```.env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUD_STORAGE_KEY=your_cloud_storage_key
   CLOUD_STORAGE_SECRET=your_cloud_storage_secret
   ```

5. **Run the Application**:

   - **Start the backend server**:

     ```bash
      cd backend
      node index.js
      ```
  
   - **Start the Frontend Development Server**:

     ```bash
     cd ../
     npm run start
     ```

6. **Open your browser**:

    The application should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up/Log In**: Create an account or log in to your existing account.
2. **Create Notes/Memos:** Use the dashboard to create and manage your notes.
3. **Upload Images**: Attach important images as notes and store them securely.
4. **Edit & Delete**: Keep your workspace organized by editing or removing notes and images as needed.

## Contributing

I welcome contributions! If you'd like to contribute to Task Pulse, please fork the repository and create a pull request with your changes.

## Test Deployment Server

For a rough [preview](https://taskpulse24x7.netlify.app/) of the web Application
   
   
    
  
   

