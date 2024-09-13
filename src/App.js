import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/home/navigation/navigation.component';
import Signin from './routes/sign-in/sign-in.component';

const Shop = () => {
  return (
    <div className='shop-container'>
      Im the Shop page
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/signin' element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;
