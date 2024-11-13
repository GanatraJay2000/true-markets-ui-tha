# TrueX Market Data Feed - Frontend Take-Home Assignment

## Project Overview

A real-time market data feed application that displays live market data in an interactive table. The project is built with a focus on performance, user experience, and scalability.

## Technical Decisions

- **Next.js 15 (App Router)**
- **TanStack Table v8**
- **shadcn/ui**
- **Tailwind CSS**
- **TypeScript**
- **Zod**

## Design

- **Minimalistic and to the point**: Prioritized a clean and straightforward design for ease of use and optimal user experience.

## Architecture

### Data Flow Architecture

- **Unidirectional data flow**: Simplifies state management and debugging.
- **WebSocket context → Data Table → Cell Components**: Maintains a consistent data flow for real-time updates.
- **Type-safe with Zod schema validation**: Ensures the integrity and reliability of incoming WebSocket messages.

### Real-time Updates

- **Price change indicators**: Visual cues (green/red) that show price changes based on previous values.

## Core Features

- **Real-time price updates**: Reflects live data with minimal latency.
- **Configurable column visibility**: Users can show/hide columns based on preference.
- **Responsive design (mobile-first)**: Optimized for mobile view.
- **Sort functionality**: Allows sorting by columns.
- **Visual price change indicators**: Highlights changes in data with color cues.
- **Type-safe WebSocket messages**: Validated with Zod for reliable data processing.

## Setup & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GanatraJay2000/true-markets-ui-tha.git
   cd truex-market-data-feed
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Add environment variables**: Create a .env.local file in the root directory and add the following:
   ```bash
   NEXT_PUBLIC_WS_URL=wss://ws-feed.exchange.coinbase.com
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open in browser**: Navigate to http://localhost:3000 / respective port

## Future Improvements

- **Add data persistence**: Store state to retain user preferences and data across sessions.
- **Implement error boundaries**: Improve resilience and user experience during failures.
- **Add unit tests**: Ensure code reliability and prevent regressions.
- **Implement data throttling**: Manage high-frequency updates efficiently to avoid overloading the UI.

## Architecture Decisions

### Why Context for WebSocket?

- **Single source of truth**: Simplifies state management across the app.
- **Efficient resource management**: Reuses a single WebSocket connection.
- **Easy state sharing**: Shares data seamlessly across components.
- **Clean component architecture**: Keeps components decoupled and maintainable.

### Why TanStack Table?

- **Built-in sorting/filtering**: Reduces the need for custom implementations.
- **Virtual scrolling ready**: Supports efficient handling of large data sets.
- **Type-safe**: Ensures data safety with TypeScript integration.
- **Headless UI approach**: Provides flexibility in UI design.

### Why shadcn/ui?

- **Accessible components**: Ensures inclusivity and compliance with accessibility standards.
- **Customizable**: Easily tailored to project requirements.
- **Lightweight**: Minimizes the impact on the app's overall performance.
- **Good developer experience**: Enhances productivity with a friendly API.

> [!NOTE] 
> **Note on Next.js 15 Hydration Warning**: If you encounter a hydration warning when running the project in Next.js 15, this may be due to browser extensions interfering with the rendered HTML. Try running the app in incognito mode to verify if the warning persists. This approach can help ensure that extensions are not causing the mismatch between server and client-side rendering.
