import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/sections/Home";
import { Skills } from "./components/sections/Skills";
import { Portfolio } from "./components/sections/Portfolio";
import { Education } from "./components/sections/Education";
import { Languages } from "./components/sections/Languages";
import { Contact } from "./components/sections/cotact";
import { Footer } from "./components/sections/Footer";

import "./index.css";
import "./App.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-[#0a0f18] text-gray-100 flex`}
      >
        <Sidebar />
        <main className="flex-grow ml-20 md:ml-32">
          <Home />
          <Skills />
          <Portfolio />
          <Education />
          <Languages />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
