import React, { useCallback, useState } from "react";
import { generateItems } from "./utils";
import {
  Header,
  ItemList,
  ComplexForm,
  NotificationSystem,
} from "./components";
import { User, Notification, AppContextType, Theme } from "./types/types";
import { AppContext, ThemeContext } from "./context/appContext";
import { useMemo } from "./@lib";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [items, setItems] = useState(generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );
  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const contextValue: AppContextType = useMemo(
    () => ({
      user,
      login,
      logout,
      notifications,
      addNotification,
      removeNotification,
    }),
    [user, login, logout, notifications, addNotification, removeNotification],
  );

  const themeValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <AppContext.Provider value={contextValue}>
        <div
          className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
        >
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-4">
                <ItemList items={items} onAddItemsClick={addItems} />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <ComplexForm />
              </div>
            </div>
          </div>
          <NotificationSystem />
        </div>
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
