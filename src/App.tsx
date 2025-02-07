import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import SpeechReader from "./components/common/SpeechReader";
import styled from "styled-components";

const RelativeDiv = styled.div`
  position: relative;
`;

const App = () => {
  return (
    <AuthProvider data-testid="auth-provider">
      <RelativeDiv>
        <Layout data-testid="layout-component" />
        <SpeechReader data-testid="speech-reader" />
      </RelativeDiv>
    </AuthProvider>
  );
};

export default App;
