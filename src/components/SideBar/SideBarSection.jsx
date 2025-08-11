import { NavLink } from "react-router-dom";
import style from "./SideBarSection.module.css";
let SideBar = () => {
  return (
    <aside className={style.sideBar}>
      <ul className={style.navBar}>
        <li className={style.list}>
          <NavLink
            to="/notes"
            className={(props) =>
              props.isActive ? `${style.link} ${style.active}` : style.link
            }
            end
          >
            Notes
          </NavLink>
        </li>
        <li className={style.list}>
          <NavLink
            to="/notes/favorites"
            className={(props) =>
              props.isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Favorites
          </NavLink>
        </li>
        <li className={style.list}>
          <NavLink
            to="/notes/new"
            className={(props) =>
              props.isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            New Note
          </NavLink>
        </li>
        <li className={style.list}>
          <NavLink
            to="/notes/settings"
            className={(props) =>
              props.isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
