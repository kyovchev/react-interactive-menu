import { useQuery } from "@tanstack/react-query";

import ErrorBlock from "../UI/ErrorBlock.jsx";

import { fetchMenus } from "../../query_utils/db.js";
import { QUERY_STALE_TIMES } from "../../../config/config.js";

import styles from "./MenuPicker.module.css";

export default function MenuPicker({ selectedMenu, onSelect }) {
  const {
    data: menus,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: fetchMenus,
    staleTime: QUERY_STALE_TIMES.menus,
  });

  return (
    <>
      {isPending && <p>Loading menus...</p>}
      {isError && (
        <ErrorBlock
          title="Failed to load menus"
          message="Please try again later."
        />
      )}
      {menus && (
        <div className={styles.menuPicker}>
          <p>Select a menu category</p>
          <ul>
            {menus.order.map((id) => {
              return (
                <li
                  key={id}
                  onClick={() => onSelect(id)}
                  className={selectedMenu === id ? styles.selected : undefined}
                >
                  <div>
                    <img
                      src={`/images/${
                        menus.data[menus.index["id_" + id]].photo
                      }`}
                      alt={menus.data[menus.index["id_" + id]].title}
                    />
                    <span>{menus.data[menus.index["id_" + id]].title}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
