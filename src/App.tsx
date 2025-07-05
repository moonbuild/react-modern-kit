import AppContent from './AppContent';
import ThemeProvider from './utils/theme/ThemeProvider';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
