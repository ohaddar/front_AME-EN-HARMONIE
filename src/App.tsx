import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import SpeechReader from "./components/common/SpeechReader";

function App() {
  return (
    <AuthProvider>
      <div style={{ position: "relative" }}>
        <Layout />
        <SpeechReader />
      </div>
    </AuthProvider>
  );
}

export default App;
