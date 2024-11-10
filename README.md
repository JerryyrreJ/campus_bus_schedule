# Campus Bus Schedule Webapp

A real-time shuttle bus schedule tracker for inter-campus transportation. This modern web application helps students and staff track shuttle departures between Phase I and Phase II campuses with precise timing and countdown features.

![Campus Bus Schedule](https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=2000)

## Features

- Real-time departure tracking
- Live countdown to next bus
- Weekday and weekend schedule support
- Automatic schedule updates
- Responsive design for all devices
- Location-based departures
- Fast and lightweight

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/campus-bus-schedule.git

# Navigate to project directory
cd campus-bus-schedule

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. Select your current location (Phase I or Phase II campus)
2. View the next departure time
3. Check the countdown timer for the next bus
4. Toggle between weekday and weekend schedules

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- ESLint
- Lucide React Icons

## Project Structure

```
src/
├── components/         # React components
│   ├── LocationToggle  # Location selector component
│   └── NextBus        # Next departure display
├── data/              # Schedule data
├── types/             # TypeScript definitions
└── App.tsx            # Main application component
```

## Dependencies

### Production Dependencies
- `react` - UI library
- `react-dom` - React DOM renderer
- `lucide-react` - Icon library

### Development Dependencies
- `typescript` - Type checking
- `vite` - Build tool and dev server
- `tailwindcss` - Utility-first CSS framework
- `eslint` - Code quality tool

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Bus schedule data provided by Campus Transportation Services
- Icons by [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev)