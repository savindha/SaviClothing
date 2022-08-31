import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/navigation/navigation.component";

const Shop = () => {
  return (
    <h1>I AM THE SHOP</h1>

  )
}

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />}></Route>
      <Route path="shop" element={<Shop />}></Route>
    </Route>
  </Routes>

)

export default App;
