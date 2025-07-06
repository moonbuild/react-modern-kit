import AppContent from './AppContent';
import ThemeProvider from './utils/theme/ThemeProvider';
import './i18n';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
