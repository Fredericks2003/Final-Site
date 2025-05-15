# Obscure Holiday Explorer - ICS-200 Final Project

An interactive calendar application built with Svelte and TypeScript that showcases unusual and fun holidays throughout the year.

This project was created as a final project for ICS-200, showcasing various interactive web development techniques and modern frontend patterns.

## Project Overview

The Obscure Holiday Explorer allows users to discover and learn about unusual holidays throughout the year, through five interactive pages:

1. **Home/Calendar** - An interactive calendar showing unusual holidays with tooltips and clickable entries
2. **Holiday Details** - Detailed information about each holiday with descriptions, fun facts, and themed visuals
3. **Holiday Randomizer** - An animated wheel that selects random holidays, complete with confetti celebration effects
4. **Holiday Quiz** - Test your knowledge of obscure holidays with an interactive quiz and scoring system
5. **Create-A-Holiday** - Design your own obscure holiday with a validated form and live preview

## Technical Features

- Interactive calendar with month navigation
- Dynamic holiday highlighting with tooltips
- Detailed holiday pages with descriptions, fun facts, and dynamically generated themed visuals
- Tag-based categorization of holidays
- Animated randomizer with particle effects
- Interactive quiz with timing, scoring, and badge system
- Create-A-Holiday form with client-side validation
- Responsive design for all device sizes

## Project Structure

```
/
├── public/              # Static assets
│   └── images/          # Holiday images
├── src/
│   ├── components/      # Reusable components
│   │   └── Calendar.svelte
│   ├── data/            # Data files
│   │   └── holidays.json
│   ├── pages/           # Page components
│   │   ├── HolidayDetail.svelte
│   │   ├── RandomHoliday.svelte
│   │   ├── HolidayQuiz.svelte
│   │   └── CreateHoliday.svelte
│   ├── App.svelte       # Main application component
│   ├── app.css          # Global styles
│   └── main.ts          # Application entry point
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
yarn
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Then open your browser and navigate to `http://localhost:5173`.

### Building for Production

Build the project for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Adding Holidays

To add new holidays, edit the `src/data/holidays.json` file. Each holiday should have:

- `name`: The name of the holiday
- `date`: The date in MM-DD format
- `description`: A description of the holiday
- `funFact`: An interesting fact about the holiday
- `media`: Filename of an associated image (stored in public/images)
- `tags`: Array of categorization tags for the holiday

## Customization

- Change colors in `src/app.css`
- Modify component styles in the `<style>` section of each Svelte component
- Add new image assets to the public/images directory
