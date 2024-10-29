# 3-Tier Web Application with Docker, Kubernetes, Node.js, and MongoDB

This is a 3-tier web application that includes CRUD functionalities for posts and comments. Users can create, read, update, and delete posts, as well as add comments on each post. The application supports both Docker and Kubernetes deployments, with Node.js for the backend, MongoDB for the database, and Express.js for routing.

## Project Structure

- **Backend**: Node.js with Express.js, handling API requests for managing posts and comments.
- **Database**: MongoDB, storing posts and comments.
- **Frontend**: HTML, CSS, and JavaScript for interacting with the backend.

## Features

- Add, edit, and delete posts with images
- Add and delete comments on posts
- Dockerized for easy deployment
- Kubernetes configuration for scalable deployments

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Docker & Docker Compose**
- **Kubernetes**

## Prerequisites

- Docker and Docker Compose installed on your system
- Kubernetes cluster (e.g., kind, Minikube, or a cloud-based cluster)
- Git (for cloning the repository)

## Deployment Options

### Dockerized Application
To run this application using Docker, follow these steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/KhuramMurad/project-repo-3-tier-webapp.git
   cd project-repo-3-tier-webapp
   ```

2. **Set up environment variables**: Create a `.env` file with the following MongoDB connection string:
   ```plaintext
   sudo touch .env
   sudo echo "MONGO_URI=mongodb://mongodb:27017/commentApp" > .env
   ```

3. **Run Docker Compose** to build and start the containers:
   ```bash
   sudo docker-compose build
   sudo docker-compose up -d
   ```

4. **Access the application** at `http://localhost:3000`.

5. **Stop the Application**:
   ```bash
   sudo docker-compose down
   ```

### Kubernetes Deployment

To deploy this application on a Kubernetes cluster, follow the instructions below. The Kubernetes configuration files are located in the `kubernetes` directory.

1. **Set up a Kubernetes Cluster** (using kind for local deployment):
   ```bash
   kind create cluster --name my-cluster
   ```

2. **Build and Load the Docker Image**:
   ```bash
   sudo docker build -t local-webapp:latest .
   kind load docker-image local-webapp:latest --name my-cluster
   ```

3. **Apply the Kubernetes configurations**:
   Navigate to the `kubernetes` directory and apply the configuration files:
   ```bash
   cd kubernetes
   sudo kubectl apply -f mongo-pvc.yaml
   sudo kubectl apply -f mongo-deployment.yaml
   sudo kubectl apply -f app-deployment.yaml
   ```

4. **Access the Application**:
   Use port-forwarding to access the web app locally:
   ```bash
   sudo kubectl port-forward service/webapp-service 3000:3000
   ```
   Now, open ```http://localhost:3000``` to use the application.

---

## Project Structure

```
project-repo-3-tier-webapp
├── app                    # Backend server files
├── data                   # MongoDB schema and functions
├── public                 # Frontend files
├── docker-compose.yml     # Docker Compose setup
├── Dockerfile             # Docker image configuration
├── kubernetes             # Kubernetes deployment files
│   ├── mongo-pvc.yaml         # Persistent Volume Claim for MongoDB storage
│   ├── mongo-deployment.yaml  # Deployment and Service for MongoDB
│   └── app-deployment.yaml    # Deployment and Service for the web application
├── .gitignore
├── README.md              # Project documentation
└── package.json           # Node dependencies
```

## API Endpoints

### Posts

- **GET /api/posts** - Fetch all posts with comments
- **POST /api/posts** - Create a new post (supports image uploads)
- **PUT /api/posts/:postId** - Edit a post by ID
- **DELETE /api/posts/:postId** - Delete a post by ID

### Comments

- **POST /api/posts/:postId/comments** - Add a comment to a post
- **DELETE /api/posts/:postId/comments/:commentId** - Delete a comment by ID

## Screenshots

![image](https://github.com/user-attachments/assets/075b8751-823d-418c-8b65-cc496da2ffa4)


## Contributing

Feel free to open issues or submit pull requests for any improvements. All contributions are welcome!

## License

This project is open for everyone to use, modify, and share without any specific licensing restrictions.

