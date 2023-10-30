import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import About from './pages/About';
import SingleTicker from './pages/SingleTicker';
import Error from './pages/Error';
import Background from './components/Background';

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/coin/:id" element={<SingleTicker />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
