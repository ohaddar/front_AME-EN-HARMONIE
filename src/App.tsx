import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import SpeechReader from "./components/common/SpeechReader";

const App = () => {
  return (
    <AuthProvider data-testid="auth-provider">
      <Layout data-testid="layout-component" />
      <SpeechReader data-testid="speech-reader" />
    </AuthProvider>
  );
};

export default App;
