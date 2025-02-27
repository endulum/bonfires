import { createContext, useState } from "react";

import {
  User,
  UserData,
  type ChannelData,
  type ChannelUser,
} from "../../../types";
import { useOutletContext } from "react-router-dom";
import { socket } from "../../../functions/socketClient";
import { useLogger } from "../../../hooks/useLogger";

type Context = {
  id: string;
  owner_id: string;
  title: string;
  updateTitle: (newTitle: string) => void;
  users: ChannelUser[];
  getYou: () => ChannelUser | undefined;
  getSettingsForUser: (id: string) => {
    name: string;
    color: string | null;
    isOwner: boolean;
    isInChannel: boolean;
  };
};

const ChannelContext = createContext({} as Context);

const ChannelContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ChannelData;
}) => {
  const { user: you } = useOutletContext<{ user: UserData }>();

  const [title, setTitle] = useState<string>(data.title);

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const [users, setUsers] = useState<ChannelUser[]>(data.users);

  const getYou = () => {
    return users.find((u) => u._id === you._id);
  };

  const getSettingsForUser = (id: string) => {
    const user = users.find((u) => u._id === id);
    if (!user)
      return {
        name: "unknown",
        color: null,
        isOwner: false,
        isInChannel: false,
      };
    return {
      name: user.channelSettings.displayName ?? user.username,
      color:
        user.channelSettings.nameColor ??
        user.settings.defaultNameColor ??
        "var(--text)",
      isOwner: user._id === data.owner._id,
      isInChannel: true,
    };
  };

  socket.on("channel title", (newTitle: string) => {
    setTitle(newTitle);
  });

  socket.on("user invite", (user: ChannelUser) => {
    setUsers([...users, user]);
  });

  socket.on("user leave", (id: string) => {
    setUsers(users.filter((u) => u._id !== id));
  });

  socket.on("user personalize", (user: ChannelUser) => {
    setUsers(
      users.map((u) => {
        if (u._id === user._id) return user;
        return u;
      })
    );
  });

  const [activeUsers, setActiveUsers] = useState<Array<User>>([]);

  socket.on("activity", async (users: User[] | null) => {
    if (users) setActiveUsers(users);
    else setActiveUsers([]);
  });

  useLogger({ activeUsers });

  return (
    <ChannelContext.Provider
      value={{
        id: data._id,
        owner_id: data.owner._id,
        title,
        updateTitle,
        users,
        getYou,
        getSettingsForUser,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export { ChannelContext, ChannelContextProvider };
