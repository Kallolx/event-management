# Event Management System

A mobile-friendly event management website designed for organizing gatherings, such as Iftar parties. Users can register for events by providing their details and manually submitting payments via Bkash/Nagad.

## Features

- **Home Page (Landing Page)**
  - Displays current event details
  - Mobile-first design with modern UI
  - Easy registration access

- **Registration System**
  - User-friendly registration form
  - Manual payment submission
  - Payment proof upload
  - Mobile number verification

- **Admin Panel**
  - Registration management
  - Payment verification
  - Approval/rejection system
  - SMS notification system

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hot Toast
- Heroicons
- DM Sans Font

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Home page
│   ├── register/
│   │   └── page.tsx        # Registration page
│   └── admin/
│       └── page.tsx        # Admin dashboard
├── components/
│   └── RegistrationForm.tsx
└── styles/
    └── globals.css
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Add your environment variables here
NEXT_PUBLIC_SMS_API_KEY=your_sms_api_key
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
