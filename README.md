# csv-upload
## Getting Started

To get the API up and running on your local machine, follow these steps:

1. Clone the repository:
    git clone https://github.com/nikisrma/csv-upload.git
2. Install dependencies:
    cd csv-upload
    npm install

3. Start the server:
    npm start
The server will run on http://localhost:5000 by default.
## Endpoints

- `GET /` - Render the home page.

- `POST /upload` - Upload a file to the server. (Requires a file upload using the `file` field)

- `GET /detail` - View details of the uploaded file.

The API uses Multer middleware to handle file uploads. Uploaded files are stored in the `uploads/` directory on the server. Each file is given a unique filename based on the current timestamp and a random number to prevent filename clashes.
The API routes are handled by controllers located in the `controllers/home_controller.js` file.
