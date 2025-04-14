import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store/store";
import { useEffect, useState } from "react";
import apiclient from "./lib/apiclient";
import { GET_USER_INFO } from "./utils/constants";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuth = !!userInfo;
  return isAuth ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuth = !!userInfo;
  return isAuth ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiclient.get(GET_USER_INFO, { withCredentials: true });
        if (res.status === 200) {
          setUserInfo(res.data);
        } else {
          setUserInfo(null);
        }
      }
      catch (error) {
        console.error("Error fetching user data:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
  
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;