import Root from "./Root/Root";
import AuthContextProvider from "./store/auth-context";

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
