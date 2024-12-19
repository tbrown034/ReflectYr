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

## 📝 To-Do List

### **MVP Priorities**

1. **Hero Section**

   - [ ] Replace the placeholder hero photo with a visually engaging, high-quality image.
   - [ ] Improve typography across the app for better readability and design consistency.

2. **Light Mode**

   - [ ] Add a light mode toggle with a finalized color palette.
   - [ ] Ensure both light and dark modes are responsive and consistent.

3. **Movies Functionality**

   - [x] Fetch and display movies from TMDB API. _(Already implemented)_
   - [ ] Fix responsive issues, ensuring movie lists and other elements look great on all screen sizes.
   - [ ] Add touch-friendly buttons for mobile devices.

4. **Replicate Movies for TV**

   - [ ] Use TMDB’s TV API endpoints to create a similar experience for TV shows.
   - [ ] Add pagination, search, and dynamic routes for TV shows.

5. **Add Music Support**

   - [ ] Research and integrate a music API (e.g., Spotify, Last.fm) for list creation.
   - [ ] Implement music-specific pages with list functionality.

6. **Authentication**

   - [x] Add GitHub login functionality. _(Already implemented)_
   - [ ] Extend authentication options by integrating Google Sign-In.

7. **Finalized List Improvements**

   - [ ] Add optional movie posters to the finalized list.
   - [ ] Improve alignment between numbers and movie titles for better readability.
   - [ ] Ensure lists are capped at 10 items, with error messages or warnings if exceeded.

8. **Shareable Lists**

   - [ ] Allow users to copy a shareable link to their finalized list.
   - [ ] Add meta information for optimized social media previews.

9. **Testing and Legal**
   - [ ] Perform basic QA testing and unit tests for core functionalities.
   - [ ] Include legal disclaimers, copyright information, and data/privacy protection statements.

---

### **Stretch Goals**

1. **Additional Media Features**

   - [ ] Add books functionality using an appropriate API (e.g., Google Books API).
   - [ ] Implement a toggle to allow users to create lists for different years.

2. **Custom List Themes**

   - [ ] Allow users to choose themes (e.g., handwritten, minimalist, award-inspired) for their finalized lists.

3. **Enhanced Sharing Options**

   - [ ] Integrate social media sharing (e.g., Twitter, Facebook) with pre-formatted text and list previews.
   - [ ] Use TMDB's external ID API to enable seamless sharing on platforms like Letterboxd.

4. **AI Integration**

   - [ ] Use AI (e.g., ChatGPT or TMDB recommendations) to suggest movies based on a user’s finalized list.

5. **Analytics**

   - [ ] Integrate tools like Vercel or Google Analytics to track user behavior and engagement.

6. **Domain and Branding**
   - [ ] Purchase a custom domain and finalize branding for public launch.

---

### **Nice-to-Have Enhancements**

1. **UI/UX Refinements**

   - [ ] Add "About This Website" and "About the Developer" sections to the homepage.
   - [ ] Include detailed tech stack information in the “About” section to showcase your skills.

2. **PostgreSQL Database Integration**

   - [ ] Migrate user lists and authentication data to a PostgreSQL database for persistent storage.
   - [ ] Use Prisma for database management and link it with existing authentication.

3. **Security Improvements**

   - [ ] Implement API rate limiting to protect against abuse.
   - [ ] Add stricter validation for user input and API requests.

4. **Finalized List Images**
   - [ ] Display images for movies, TV shows, and other media in finalized lists.

---

### **Prioritization Order**

**Phase 1: Foundational Work**

1. Update hero photo and typography.
2. Fix responsive design issues for movies.
3. Add light mode and toggle functionality.
4. Begin testing and ensure legal protections.

**Phase 2: Expand Functionality** 5. Replicate movies functionality for TV shows. 6. Add music support with API integration. 7. Extend authentication with Google Sign-In.

**Phase 3: Stretch and Polish** 8. Enable finalized list themes and sharing options. 9. Migrate user data to PostgreSQL for persistence. 10. Add books functionality and AI-powered suggestions.

---

This to-do list is designed to guide the completion of both MVP and stretch features while keeping tasks organized and prioritized.

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
