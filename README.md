```markdown
# 3-Tier Web Application with Docker, Node.js, and MongoDB

This is a 3-tier web application that includes CRUD functionalities for posts and comments. Users can create, read, update, and delete posts, as well as add comments on each post. The application is fully Dockerized and uses Node.js for the backend, MongoDB for the database, and Express.js for routing. Images uploaded with posts are stored in the application’s file system.

## Project Structure

- **Backend**: Node.js with Express.js, handles API requests for managing posts and comments.
- **Database**: MongoDB, stores posts and comments.
- **Frontend**: Simple HTML, CSS, and JavaScript for interacting with the backend.

## Features

- Add, edit, and delete posts with images
- Add and delete comments on posts
- Dockerized for easy deployment

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Docker & Docker Compose**

## Prerequisites

- Docker and Docker Compose installed on your system.
- Git (for cloning the repository).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KhuramMurad/project-repo-3-tier-webapp.git
cd project-repo-3-tier-webapp
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and specify the MongoDB connection string:

```plaintext
MONGO_URI=mongodb://mongodb:27017/commentApp
```

### 3. Run the Application with Docker Compose

Build and start the Docker containers:

```bash
docker-compose build
docker-compose up -d
```

This will start the app in detached mode. The application will be accessible at `http://localhost:3000`.

### 4. Stop the Application

To stop the Docker containers, run:

```bash
docker-compose down
```

## Project Structure

```
project-repo-3-tier-webapp
├── app
│   └── server.js               # Main server file with API routes
├── data
│   └── db.js                   # Database schema and functions
├── public
│   ├── index.html              # Frontend HTML
│   ├── script.js               # Frontend JavaScript
│   └── uploads                 # Folder for uploaded images
├── Dockerfile                  # Docker configuration for app
├── docker-compose.yml          # Docker Compose setup
├── .env                        # Environment variables
├── package.json                # Node dependencies
└── README.md                   # Project documentation
```

## API Endpoints

### Posts

- **GET /api/posts** - Fetch all posts with comments
- **POST /api/posts** - Create a new post (image upload supported)
- **PUT /api/posts/:postId** - Edit a post by ID
- **DELETE /api/posts/:postId** - Delete a post by ID

### Comments

- **POST /api/posts/:postId/comments** - Add a comment to a post
- **DELETE /api/posts/:postId/comments/:commentId** - Delete a comment by ID

## Screenshots

*Coming soon!*

## Contributing

Feel free to open issues or submit pull requests for any improvements. All contributions are welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
```

This `README.md` file includes sections to guide users on cloning, running, and understanding the project structure and functionality. You can further customize it as needed!
