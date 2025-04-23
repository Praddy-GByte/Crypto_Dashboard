# Live Cryptocurrency Dashboard

A real-time cryptocurrency dashboard that displays live prices, market data, and interactive charts using the CoinGecko API.

## Features

- Real-time cryptocurrency price data
- Interactive price charts using Chart.js
- Dark/Light mode toggle
- Currency selection (USD/EUR)
- Responsive design
- Top 10 cryptocurrencies by market cap

## Technologies Used

- React
- TypeScript
- Material-UI
- Chart.js
- Axios
- CoinGecko API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/App.tsx` - Main application component
- `src/components/PriceChart.tsx` - Chart component
- `src/services/cryptoService.ts` - API service
- `src/theme.ts` - Theme configuration

## API Usage

This project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data. The free tier of the API has rate limits, so please be mindful of your usage.

## License

MIT
