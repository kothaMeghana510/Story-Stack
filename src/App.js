import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from './pages/RootPage';
import Explore from "./pages/Explore";
import LikedBooks from './pages/LikedBooks'
import Favorites from "./likedComponents/Favorites";
import LibraryBooks from "./likedComponents/LibraryBooks";
import { FavoriesProvider } from "./Contexts/FavoritesContext";
import { LibraryProvider } from "./Contexts/LibraryContext";
import LayoutBook from "./likedComponents/LayoutBook";
import { readBook } from './Contexts/LibraryContext';
import CustomBook from "./likedComponents/CustomBook";
export default function App(){
 return <div>
  <FavoriesProvider>
    <LibraryProvider>
    <BrowserRouter basename="/Story-Stack">
        <Routes>
          <Route path="/" element={ <RootPage />}/>
          <Route path="explore" element={<Explore />} />
          <Route path="likedbooks" element={<LikedBooks />} >
              <Route path='library/:id' element={<LayoutBook />}/>
              <Route  index element={<Favorites />} />
              <Route path="library" element={<LibraryBooks />} />
              <Route path="custombook" element={<CustomBook />} />
          </Route>
          </Routes>
    </BrowserRouter>
    </LibraryProvider>
    </FavoriesProvider>
  </div>
}    