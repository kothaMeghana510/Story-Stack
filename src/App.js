import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import LayoutBook from "./likedComponents/LayoutBook";
import Favorites from "./likedComponents/Favorites";
import LibraryBooks from "./likedComponents/LibraryBooks";
import CustomBook from "./likedComponents/CustomBook";

import { FavoriesProvider } from "./Contexts/FavoritesContext";
import { LibraryProvider } from "./Contexts/LibraryContext";

import DotLoader from './loaderUI/DotLoader';

const RootPage = lazy(() => import('./pages/RootPage'));
const Explore = lazy(() => import('./pages/Explore'));
const LikedBooks = lazy(() => import('./pages/LikedBooks'));
 
export default function App(){
 return (
 <div>
  <FavoriesProvider>
    <LibraryProvider>
    <BrowserRouter basename="/Story-Stack">
    <Suspense fallback={<DotLoader />}>
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
          </Suspense>
    </BrowserRouter>
    </LibraryProvider>
    </FavoriesProvider>
</div>
)
}
