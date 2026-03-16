# Users App

A modern **User Management Application** built with vanilla JavaScript that performs full CRUD (Create, Read, Update, Delete) operations on user data via a REST API.

## Features

- **Create Users** – Add new users with name, city, email, and avatar selection
- **View Users** – Display all users as styled cards with their information
- **Edit Users** – Update existing user details via a modal dialog
- **Delete Users** – Remove users with a confirmation prompt
- **Real-time Updates** – UI updates automatically after each operation
- **Form Validation** – Built-in HTML5 validation for required fields

## Tech Stack

- **HTML5** – Semantic markup with native dialog element
- **CSS3** – Custom properties, glass morphism effects, gradient backgrounds
- **JavaScript (ES6+)** – Async/await, Fetch API, template literals, event delegation
- **MockAPI** – REST API backend for data persistence

## Project Structure

```
users-app/
├── index.html          # Main HTML file with form and user container
├── common.js           # All JavaScript logic (API, rendering, events)
├── css/
│   ├── base.css        # CSS reset and typography
│   ├── main.css        # Component styles (forms, cards, buttons)
│   └── variables.css   # CSS custom properties (colors, gradients)
└── README.md
```

## How It Works

1. **On Load** – Fetches all users from the API and renders them as cards
2. **Create** – Submit the form to POST a new user to the API
3. **Edit** – Click "Edit" to open a modal dialog, modify fields, and PUT updates
4. **Delete** – Click "Delete" to confirm and send a DELETE request

## API Endpoint

```
https://69a9e70832e2d46caf479796.mockapi.io/users
```

## User Data Model

| Field   | Type   | Description        |
|---------|--------|--------------------|
| id      | string | Unique identifier  |
| name    | string | User's full name   |
| city    | string | User's city        |
| email   | string | User's email       |
| avatar  | string | URL to user image  |

## Usage

1. Open `index.html` in a browser
2. Fill out the form to create a new user
3. Click "Edit" on any user card to modify their details
4. Click "Delete" to remove a user (with confirmation)