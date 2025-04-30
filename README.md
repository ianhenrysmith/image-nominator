# Image Nominator

A web application that helps users select interesting images from Wikimedia to inspire weekly AI art creation threads.

## Features

- Fetches random interesting images from Wikimedia
- Displays images in a responsive grid layout
- Allows users to select and vote for their favorite image
- Modern UI with hover effects and image details
- Mobile-responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Wikimedia API (to be implemented)

## Project Structure

- `app/` - Next.js app directory
  - `page.tsx` - Main page component
  - `layout.tsx` - Root layout
  - `globals.css` - Global styles
- `public/` - Static assets
- `tailwind.config.js` - Tailwind configuration
- `next.config.js` - Next.js configuration

## TODO

- Implement Wikimedia API integration
- Add voting system
- Add weekly thread creation
- Add user authentication
- Add image metadata display
- Add image filtering options 