// import logo from './logo.svg';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Image_to_image from './img_to_img';
import Audio from './Audio';
import Text from './Text';
import Layout from './layout';
import Tdecode from './tdecode';
import Idecode from './idecode';
import Adecode from './adecode';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
         <Route index element={<Text/>}/>
         <Route path='decode' element={<Tdecode/>}/>
        <Route path='Image' element={<Image_to_image/>}/>
        <Route path='Image/idecode' element={<Idecode/>}/>
        <Route path='Audio' element={<Audio/>}/>
        <Route path='Audio/Adecode' element={<Adecode/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
