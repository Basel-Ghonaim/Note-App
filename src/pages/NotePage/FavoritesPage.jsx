import { useSelector } from "react-redux";
import TitlePage from "../../components/TitlePage/TitlePage";
import FavoriteCard from "../../components/NoteCard/FavoriteCard";


let FavoritesPage = () => {
  let data = useSelector((state) => state.notes.filteredData);
  let favoriteData = data.filter((ele) => ele.favorite === true);
  return (
    <>
      <TitlePage title="Favorites" />
      <div className="cards">
        {favoriteData.map((ele) => (
          <FavoriteCard key={ele.id} note={ele} />
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;
