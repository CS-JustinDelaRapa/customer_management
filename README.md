# Customer Management System

A full-stack customer management application with Laravel backend API and React.js frontend.

## Tech Stack

### Backend
- PHP 8.2
- Laravel 11
- MySQL 8.0
- Docker
- Nginx

### Frontend
- React.js 18
- React Router DOM
- React Bootstrap
- Axios
- Node.js & npm

## Project Structure

```
customer_management/
├── backend/            # Laravel Backend API
│   ├── app/            # Application core code
│   ├── config/         # Configuration files
│   ├── database/       # Database migrations and seeders
│   ├── docker/         # Docker configuration files
│   ├── routes/         # API and web routes
│   ├── ...
│   ├── docker-compose.yml
│   └── Dockerfile
├── frontend/           # React Frontend Application
│   ├── public/         # Static files
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   ├── services/   # API services
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## Requirements

### Backend Requirements
- Docker Desktop
- Docker Compose
- Port 8000 available for the API
- Port 3306 available for MySQL

### Frontend Requirements
- Node.js 16 or higher
- npm 8 or higher
- Port 3000 available for the development server

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```

3. Generate application key:
   ```bash
   docker-compose exec app php artisan key:generate
   ```

4. Run database migrations:
   ```bash
   docker-compose exec app php artisan migrate
   ```

The backend API will be available at `http://localhost:8000/api`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be available at `http://localhost:3000`

## API Endpoints

The following API endpoints are available:

- `GET /api/customers` - List all customers
- `POST /api/customers` - Create a new customer
- `GET /api/customers/{id}` - Get a specific customer
- `PUT /api/customers/{id}` - Update a customer
- `DELETE /api/customers/{id}` - Delete a customer

## Features

### Customer Management
- Create new customers with validation
- View detailed customer information
- Update existing customer details
- Delete customers
- List all customers with pagination

### User Interface
- Responsive design using Bootstrap
- Clean and modern UI
- Easy navigation
- Form validation
- Error handling
- Loading states

## Development

### Backend Development
- The Laravel application uses standard MVC architecture
- API routes are defined in `routes/api.php`
- Controllers are in `app/Http/Controllers`
- Models are in `app/Models`
- Database migrations are in `database/migrations`

### Frontend Development
- React components are in `src/components`
- API services are in `src/services`
- Routing is handled by React Router
- State management uses React hooks
- UI components from React Bootstrap

## Troubleshooting

### Backend Issues
1. If containers fail to start:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

2. If database connection fails:
   - Check MySQL credentials in `.env`
   - Ensure MySQL container is running:
     ```bash
     docker-compose ps
     ```

### Frontend Issues
1. If npm install fails:
   ```bash
   rm -rf node_modules
   npm cache clean --force
   npm install
   ```

2. If API calls fail:
   - Ensure backend is running
   - Check CORS configuration
   - Verify API URL in `src/services/CustomerService.js`
