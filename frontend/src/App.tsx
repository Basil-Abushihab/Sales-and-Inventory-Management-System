import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routing/AppRoutes";
import { Layout } from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}
