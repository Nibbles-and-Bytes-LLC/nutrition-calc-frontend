import Layout from "./Layout/Layout";
import RoutesConfig from "./routes";
import Header from "./Header";
import Home from "./pages/Home";

function App() {


  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
