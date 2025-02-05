# Uber Clone

This project is a clone of the Uber application, consisting of both frontend and backend components.

## Frontend

The frontend is built using the following technologies:

1. **Vite**: A fast build tool and development server.
2. **React**: A JavaScript library for building user interfaces.
3. **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
4. **Socket.IO**: A library for real-time web applications.
5. **Google Maps API**: For integrating maps and location services.

### Key Features

1. **Real-time Updates**: Utilizes Socket.IO for real-time communication between clients and the server.
2. **Responsive Design**: Built with Tailwind CSS to ensure a responsive and mobile-friendly UI.
3. **Map Integration**: Integrates Google Maps API for location tracking and map functionalities.
4. **Fast Development**: Leveraging Vite for a fast and efficient development experience.

### Setup

To get started with the frontend, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd frontend
npm install
```

### Running the Frontend

To run the development server:

```bash
npm run dev
```

### Building the Frontend

To build the project for production:

```bash
npm run build
```

### Linting

To lint the project:

```bash
npm run lint
```

## Backend

The backend is built using the following technologies:

1. **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
2. **Express**: A minimal and flexible Node.js web application framework.
3. **MongoDB**: A NoSQL database for storing application data.
4. **Socket.IO**: For real-time communication between the server and clients.

### Key Features

1. **Real-time Communication**: Utilizes Socket.IO for real-time updates and communication.
2. **RESTful API**: Provides a RESTful API for interacting with the application data.
3. **Database Integration**: Uses MongoDB for data storage and retrieval.

### Setup

To get started with the backend, navigate to the backend folder and install the dependencies:

```bash
cd backend
npm install
```

### Running the Backend

To start the backend server:

```bash
npm run start
```

### Environment Variables

Create a `.env` file in the backend folder with the following variables:

```properties
MONGO_URI=<your-mongodb-uri>
PORT=4000
```

### Linting

To lint the backend project:

```bash
npm run lint
```
