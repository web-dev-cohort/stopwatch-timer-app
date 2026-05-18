# Stopwatch Timer App

A polished React application with two focused time tools:

- Stopwatch for tracking elapsed time with start, pause, and reset controls
- Timer with custom hour, minute, and second input
- Clear digital time displays
- Responsive Tailwind CSS interface
- Dark theme toggle with saved preference
- Animated full-screen focus mode for each running clock
- Component, hook, and utility separation for maintainable code

## Tech Stack

- React
- Vite
- Tailwind CSS
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
stopwatch-timer-app/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── AppHeader.jsx
    │   ├── ControlButton.jsx
    │   ├── DurationInput.jsx
    │   ├── StopwatchPanel.jsx
    │   ├── TimeDisplay.jsx
    │   └── TimerPanel.jsx
    ├── hooks/
    │   ├── useCountdownTimer.js
    │   └── useElapsedStopwatch.js
    └── utils/
        └── time.js
```

## Structure Details

### Root Files

- `index.html` is the Vite HTML entry point.
- `package.json` defines project dependencies and npm scripts.
- `vite.config.js` enables the React plugin for Vite.
- `tailwind.config.js` configures Tailwind content scanning and theme extensions.
- `postcss.config.js` wires Tailwind and Autoprefixer into the build pipeline.

### `src/App.jsx`

The main app shell. It keeps the top-level layout simple and composes:

- `AppHeader`
- `StopwatchPanel`
- `TimerPanel`

This file intentionally avoids timer logic so the screen structure stays easy to read.

### `src/main.jsx`

The React entry point. It mounts the app into the `#root` element from `index.html`.

### `src/styles.css`

Global stylesheet for Tailwind layers and small base styles.

### `src/components`

Reusable UI and feature components:

- `AppHeader.jsx` renders the page title, short description, and light/dark theme toggle.
- `ControlButton.jsx` provides a shared styled button with optional icons and visual intents.
- `DurationInput.jsx` renders the timer hour, minute, and second inputs.
- `StopwatchPanel.jsx` owns the stopwatch UI and connects it to the stopwatch hook.
- `TimeDisplay.jsx` renders the shared digital time display and status pill.
- `TimerPanel.jsx` owns the countdown timer UI, progress bar, and timer controls.

### `src/hooks`

Stateful time-handling logic:

- `useElapsedStopwatch.js` tracks elapsed stopwatch time using `performance.now()` and `requestAnimationFrame`.
- `useCountdownTimer.js` manages countdown duration, remaining time, running state, pause, reset, and completion.

Keeping these as hooks separates behavior from presentation and makes the components easier to maintain.

### `src/utils`

Small shared utilities:

- `time.js` contains `formatDuration`, which converts milliseconds into readable `HH:MM:SS` or `HH:MM:SS.cc` display strings.

## Features

### Stopwatch

- Start tracking elapsed time
- Pause without losing the current elapsed value
- Reset to zero
- Centisecond display for a more precise stopwatch feel
- Expands into full-screen focus mode when started

### Timer

- Set custom hours, minutes, and seconds
- Start, pause, and reset countdowns
- Inputs are disabled while running to avoid accidental duration changes
- Progress bar shows how much of the countdown has elapsed
- Completion state is reflected in the status pill
- Expands into full-screen focus mode when started

### Full-Screen Focus Mode

- Starting either clock automatically expands that panel to fill the screen
- The minimize icon returns the panel to the normal two-column layout
- The expand icon can reopen full-screen mode without restarting the clock
- Pressing `Escape` also exits full-screen mode

### Theme Toggle

- Switch between light and dark themes from the header
- Saves the selected preference in `localStorage`
- Falls back to the system color scheme on first visit

## Styling

The app uses Tailwind CSS utility classes directly in components. The UI is designed around:

- Responsive layout with a single-column mobile view and two-column desktop view
- High-contrast digital time displays
- Shared button styling through `ControlButton`
- Soft borders, shadows, and status colors for clear visual feedback

## Available Scripts

- `npm run dev` starts the local Vite development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
