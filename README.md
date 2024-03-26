# URL Shortener

Live Link  : [URL shortener](https://url-shortener-live.vercel.app/)

Welcome to URL Shortener, a URL shortener designed for efficiency and ease of use. Built on Next.js and leveraging Prisma for optimal database interactions, URL Shortener provides both a sleek, user-friendly interface. This application is designed to make URL shortening a seamless part of your workflow.

## Features

- **Effortless URL Shortening**: Get concise, shareable links in a single click.
- **Secure & Reliable**: Built with security and reliability in mind, ensuring your data is safe.
- **Fast Redirection**: Redirection of URL is faster.


## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or later)
- A PostgreSQL database
- Git

## Installation

Follow these steps to get your NextShort up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nextshort.git
cd nextshort
```

### 2. Install Dependencies

Navigate into the project directory and install its dependencies:

```bash
npm install
```

### 3. Configure Environment

Copy the .env.example file to .env and update it with your database connection details and other configurations:

```bash
cp .env
# Then edit .env with your database URL and any other environment variables
```

### 4. Initialize the Database

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev
```

### 5. Start the Application

Launch the development server:

```bash
npm run dev
```

Visit http://localhost:3000 in your browser to see the Application in action.

### Usage Shortening URLs

- Navigate to the homepage.
- Enter the URL you wish to shorten.
- Click on "Make it short" button to receive your shortened URL.
- You can also get your previously created URLs.


### Acknowledgements

- [Next.js](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://nextjs.org/&ved=2ahUKEwj0nfm1u4-FAxW9wTgGHdW4CvMQFnoECAcQAQ&usg=AOvVaw2lvpxQDmLPmn3zhK26RJ4F) for the frontend and backend framework.

- [Prisma](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.prisma.io/&ved=2ahUKEwjSrrHEu4-FAxXa7TgGHWftDIIQFnoECAcQAQ&usg=AOvVaw2b8GP2jeZluoXn4yBH9QGM) for database management.

- [shadcn](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://ui.shadcn.com/&ved=2ahUKEwj9teLJu4-FAxVm7zgGHfJnDjwQFnoECAcQAQ&usg=AOvVaw26SVeBbB0mrlJEGtTeLGQW) and other npm libraries that make this project possible.
