import { Outlet } from "react-router-dom";
import ChatsListSidebar from "../../components/sidebars/GroupsListSidebar";
import AuthorizationWindow from "../../components/pages/AuthorizationWindow";

interface LayoutProps {
  data: object;
  userIsLoggined: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Layout({ data, userIsLoggined, setAuthState } : LayoutProps) {
  return (
    <section id='main-body'>
      {(data || userIsLoggined) ? (
        <>
          <ChatsListSidebar />
          <Outlet />
        </>
      ) : (
        <AuthorizationWindow onSuccessfulAuthorization={() => setAuthState(true)} />
      )}
    </section>
  );
}

export default Layout;