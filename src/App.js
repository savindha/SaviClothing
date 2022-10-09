import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.util";
import { setCurrentUser } from "./store/user/user.action";
import { fetchCategoriesAsync } from "./store/categories/category.actions";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    })

    return unsubscribe
  }, []);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    /**
     * Below is to add data to DB. Should run only ONCE.
     * 
     * addCollectionsAndDocuments('categories', SHOP_DATA)
     */
  }, [])


  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>

  )
};

export default App;
