import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import styles from "./Layout.module.css"

function Layout() {
    return (
        <div>
            <Header />
            <div className={styles.content}>
              <NavBar />
              <main>
                  <Outlet />
              </main>
          </div>
      </div>
  );
}

export default Layout;