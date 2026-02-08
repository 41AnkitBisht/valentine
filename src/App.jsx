import ValentinePage from "./components/ValentinePage";
import "./App.css";
import { lazy, Suspense } from "react";
import "./Loader.css";

const LazyValentinePage = lazy(() => import("./components/ValentinePage"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        }
      >
        <LazyValentinePage />
      </Suspense>
    </>
  );
}

export default App;
