import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { lightTheme, darkTheme } from './theme';
import { fetchTopCryptos, fetchMarketChart, CryptoData, MarketChartData } from './services/cryptoService';
import { PriceChart } from './components/PriceChart';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [chartData, setChartData] = useState<MarketChartData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTopCryptos(currency);
        setCryptos(data);
        if (data.length > 0) {
          setSelectedCrypto(data[0]);
        }
      } catch (error) {
        console.error('Error loading crypto data:', error);
      }
    };
    loadData();
  }, [currency]);

  useEffect(() => {
    const loadChartData = async () => {
      if (selectedCrypto) {
        try {
          const data = await fetchMarketChart(selectedCrypto.id, currency);
          setChartData(data);
        } catch (error) {
          console.error('Error loading chart data:', error);
        }
      }
    };
    loadChartData();
  }, [selectedCrypto, currency]);

  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
          <Typography variant="h4" component="h1">
            Crypto Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                label="Currency"
                onChange={handleCurrencyChange}
              >
                <MenuItem value="usd">USD</MenuItem>
                <MenuItem value="eur">EUR</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ width: '30%' }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Top Cryptocurrencies
              </Typography>
              {cryptos.map((crypto) => (
                <Card
                  key={crypto.id}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    backgroundColor: selectedCrypto?.id === crypto.id ? 'action.selected' : 'background.paper',
                  }}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <img src={crypto.image} alt={crypto.name} style={{ width: 24, height: 24 }} />
                      <Typography variant="subtitle1">{crypto.name}</Typography>
                    </Box>
                    <Typography variant="body2">
                      Price: {crypto.current_price} {currency.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={crypto.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'}
                    >
                      Change: {crypto.price_change_percentage_24h.toFixed(2)}%
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Box>

          <Box sx={{ width: '70%' }}>
            <Paper sx={{ p: 2 }}>
              {selectedCrypto && chartData ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    {selectedCrypto.name} Price Chart
                  </Typography>
                  <PriceChart data={chartData} currency={currency} />
                </>
              ) : (
                <Typography>Loading chart data...</Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 