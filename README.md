# Cyberlevels Job Board Platform

A full-featured job board and career consulting platform built with **Next.js**, **MongoDB**, and **Express.js**, enhanced with **Generative AI** features. This application supports job seekers, recruiters, and administrators with cutting-edge functionality, including autosuggest, multi-admin roles, and AI-powered insights.

**Demo** https://www.cyberlevels.com/

## Key Features

- **Generative AI Integration**: AI-assisted job recommendations and career advice.
- **Autosuggest**: Intelligent search and suggestions for job titles, skills, and companies.
- **Multi-Admin Roles**: Fine-grained access control for super admins, recruiters, and moderators.
- **Responsive Design**: Fully responsive UI for seamless use across devices.
- **RESTful APIs**: Robust backend API for managing jobs, users, and applications.
- **Job Seeker Dashboard**: Personalized dashboard for managing applications and saved jobs.
- **Recruiter Dashboard**: Easy-to-use interface for posting jobs, reviewing applications, and managing teams.

## Tech Stack

- **Frontend**: Next.js (React framework for SSR and SPA)
- **Backend**: Express.js (REST API server)
- **Database**: MongoDB (NoSQL database for scalability)
- **Generative AI**: OpenAI API integration for intelligent suggestions and advice
- **Authentication**: JWT-based authentication with role-based access control

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-board-platform.git
   cd job-board-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     OPENAI_API_KEY=<your_openai_api_key>
     NEXT_PUBLIC_BASE_URL=<http://localhost:3000 or your deployed URL>
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Access the application at:
   ```
   http://localhost:3000
   ```

## Application Structure

### Frontend

- **Pages**: Dynamic routing and SSR using Next.js.
- **Components**: Reusable UI components.
- **Styles**: Tailwind CSS for design and styling.

### Backend

- **Express.js**: RESTful API server.
- **MongoDB Models**: Data models for users, jobs, and applications.
- **Middleware**: JWT authentication and role-based access control.

## Features in Detail

### Generative AI

- **AI Job Recommendations**: Personalized job suggestions based on user profiles.
- **Career Advice**: AI-powered tips for resume building and interview preparation.

### Autosuggest

- **Smart Search**: Autocomplete for skills, job titles, and companies.
- **Real-Time Feedback**: Updates suggestions as you type.

### Multi-Admin Roles

- **Super Admin**: Full control over the platform, including managing other admins.
- **Recruiters**: Access to post jobs, review applications, and communicate with candidates.
- **Moderators**: Ability to review and approve job posts and user accounts.

## Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Deploy to Vercel** (recommended for Next.js):
   - Connect the repository to Vercel.
   - Set environment variables in the Vercel dashboard.

## Testing

Run tests to ensure application functionality:

```bash
npm test
```

## Roadmap

- [ ] Add AI-powered resume parser.
- [ ] Integrate analytics dashboard for admin users.
- [ ] Enhance multi-language support.
- [ ] Add support for video-based interviews.

## Contributing

We welcome contributions! Please open an issue or submit a pull request to suggest improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For inquiries, please contact the maintainer:

- **Email**: hello@metageeks.tech
