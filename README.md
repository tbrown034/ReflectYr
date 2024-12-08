ReflectYr

ReflectYr is a personalized year-in-review app designed to help users reflect on and curate their favorite movies, TV shows, music, and books from the past year. It’s a sleek, user-first platform that empowers you to own your story and share it with friends—or keep it just for yourself.

Built with the Next.js App Router and modern tools like TailwindCSS, Heroicons, and Prisma, ReflectYr combines a clean user experience with the latest in web development.

Getting Started

To run ReflectYr locally, follow these steps: Clone the repository and install dependencies, then start the development server:
git clone
cd reflectyr
npm install
npm run dev
Or, if you’re using another package manager:
yarn install && yarn dev
pnpm install && pnpm dev
bun install && bun dev

Open http://localhost:3000 in your browser to see the app in action.

Editing the App

You can start editing the app by modifying the main entry point: app/page.jsx (or app/page.tsx if using TypeScript). The app will hot-reload automatically when you save your changes.

Features

Current
• Curate Your Year: Add your favorite movies, music, TV shows, and books to your list.
• Reorder and Customize: Organize your picks however you want.
• Dynamic Icons and Light/Dark Mode: Includes dynamic SVG icons (like the clock) that adapt to your system’s light/dark mode.
• Visual Sharable Recaps: Export your recap as a beautiful social media post or PDF.

Coming Soon
• User Accounts: Save your year-in-review and revisit it anytime.
• More Media Categories: Expand your list with games, podcasts, and more.
• Friends’ Lists: Compare your favorites with your friends.

Tech Stack

ReflectYr uses a modern web stack, making it lightweight, scalable, and easy to deploy:
• Next.js: React framework with App Router and server-side rendering.
• TailwindCSS: Utility-first styling for a fast, responsive UI.
• Heroicons: Beautiful, reusable icons (e.g., clock, arrow-path).
• Prisma: Database ORM for clean and efficient database management.
• Vercel: Seamless hosting and deployment for Next.js apps.

Using Dynamic Icons

This app integrates Heroicons dynamically with light/dark mode support. Icons are stored in the src/components/icons folder and are imported as React components. For example, to use the ClockIcon:
import { ClockIcon } from ‘@/components/icons/Icons’;
export default function Example() {
return ;
}

Learn More

Resources to learn more about the tools used in ReflectYr:
• Next.js Documentation: Learn about Next.js features and APIs.
• Next.js Interactive Tutorial: A beginner-friendly guide to building Next.js apps.
• TailwindCSS Documentation: Learn how to style your components with utility-first classes.
• Heroicons: Explore the icons used in the app.
• Prisma Documentation: Understand database management with Prisma.

Deploying ReflectYr

The easiest way to deploy ReflectYr is through Vercel, the creators of Next.js. You can deploy the app directly from your GitHub repository by linking it to https://vercel.com/new

For more details, visit the official Next.js deployment documentation at https://nextjs.org/docs/app/building-your-application/deploying

Contributing

Feedback, issues, and contributions are welcome! Feel free to fork the repository, open an issue, or submit a pull request.

License

Copyright (c) 2024 Trevor Brown

All rights reserved. This software and associated documentation files (the “Software”) are the sole property of Trevor Brown. Permission is not granted to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of the Software, except with the prior written consent of Trevor Brown.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHOR OR COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For inquiries regarding usage, licensing, or partnerships, please contact: trevor.brown@gmail.com.
