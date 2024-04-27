import React from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apolloClient';
import Employees from './components/Employees';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Configure the dark theme using Material-UI's createTheme function.
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Dark mode theme for UI consistency.
  },
});

/**
 * App is the root component that sets up the Apollo and Material-UI theme providers.
 * It wraps the Employees component with necessary context for GraphQL operations
 * and consistent styling across the application.
 */
function App() {
  // Initialize the Apollo client
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Employees />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
