import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import SpeechReader from "./components/common/SpeechReader";

function App() {
  return (
    <AuthProvider data-testid="auth-provider">
      <div style={{ position: "relative" }}>
        <Layout data-testid="layout-component" />
        <SpeechReader data-testid="speech-reader" />
      </div>
    </AuthProvider>
  );
}

export default App;
