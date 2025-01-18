import Layout from "./components/layouts/Layout";
import FloatingChatIcon from "./components/bot/FloatingChatIcon";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div style={{ position: "relative" }}>
        <Layout />
        <FloatingChatIcon />
      </div>
    </AuthProvider>
  );
}

export default App;
