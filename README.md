***Docker***
is a platform that allows you to create, deploy, and run applications inside containers. Containers package up your code and all its dependencies so that the application runs reliably in different computing environments. Think of containers like lightweight virtual machines.

Key Concepts:
Images: A Docker image is a lightweight, stand-alone, and executable software package that includes everything needed to run a piece of software (code, runtime, libraries, environment variables). You build images from a Dockerfile.
Containers: When you run a Docker image, it becomes a container. Containers are instances of Docker images that run the application inside isolated environments.
In Your Application:
We created Dockerfiles for both the backend (FastAPI) and frontend (React).
The backend Dockerfile:
Used a Python image.
Installed dependencies via requirements.txt.
Set the working directory and ran the FastAPI app using uvicorn.
The frontend Dockerfile:
Used a Node.js image.
Installed dependencies via package.json.
Set the working directory and ran the React app with npm start.

***Docker Compose*** 
We used Docker Compose to manage running both containers together. Docker Compose allows you to define and run multiple Docker containers (services) in one file (docker-compose.yml). It's handy when you have multiple services like frontend and backend, as it automates the startup and networking.

***Usage:***
***Why Docker?***
Consistency: 
It ensures that your app behaves the same on any machine, whether local or in production, by packaging dependencies and settings inside the container.

Portability: 
You can easily move your application between environments (e.g., from development to production) without worrying about compatibility issues.

Isolation: 
Each service (backend and frontend) runs in its own container, preventing conflicts between services and allowing better management of resources.