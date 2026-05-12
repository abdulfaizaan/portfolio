# Abdul Faizaan's Portfolio

A modern, interactive portfolio website showcasing projects, skills, and experience. Built with React and Vite for a fast, responsive user experience.

## Features

- **Modern Design:** Clean, SaaS-inspired design with a glass-effect navbar and sleek animations.
- **Responsive Layout:** Fully responsive across desktop, tablet, and mobile devices.
- **Interactive Components:** Animated sections and a mobile-friendly hamburger menu with smooth transitions.
- **Optimized Performance:** Fast development build using Vite with TailwindCSS for efficient styling.

## Technologies

- **React:** Component-based UI library.
- **Vite:** Fast and lean development build tool.
- **TailwindCSS:** Utility-first CSS framework.
- **JavaScript (ES6+):** Modern JavaScript features and best practices.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abdulfaizaan/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application should now be running at [http://localhost:5173](http://localhost:5173).

## Build

To create a production build, run:

```bash
npm run build
```

Then, you can preview the production build with:

```bash
npm run preview
```

## Folder Structure

```
portfolio/
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── assets/
    ├── components/
    │   ├── LoadingScreen.jsx
    │   ├── RevealOnScroll.jsx
    │   ├── Sidebar.jsx
    │   └── sections/
    │       ├── Home.jsx
    │       ├── Skills.jsx
    │       ├── Portfolio.jsx
    │       ├── Education.jsx
    │       ├── Languages.jsx
    │       ├── cotact.jsx
    │       └── Footer.jsx
```

## Customization

- **Styles:** Modify `src/index.css` and `src/App.css` to customize the design with Tailwind CSS.
- **Components:** Update components in `src/components/` to add or modify shared UI elements like the Sidebar and LoadingScreen.
- **Sections:** Edit individual section files in `src/components/sections/` to update:
  - **Home.jsx** - Hero section with introduction
  - **Skills.jsx** - Technical skills and proficiencies
  - **Portfolio.jsx** - Project showcase
  - **Education.jsx** - Education and certifications
  - **Languages.jsx** - Programming languages and frameworks
  - **cotact.jsx** - Contact information and forms
  - **Footer.jsx** - Footer with social links

## Features Breakdown

- **LoadingScreen:** Animated splash screen on initial load
- **Sidebar:** Fixed navigation with smooth transitions
- **RevealOnScroll:** Custom hook for scroll-triggered animations
- **Responsive Design:** Mobile-first approach with Tailwind CSS breakpoints

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Happy coding and enjoy building your professional portfolio!
