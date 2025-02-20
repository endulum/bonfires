import { createContext, useState } from "react";

import { type ChannelData, type ChannelUser } from "../../../types";

type Context = {
  id: string;
  title: string;
  updateTitle: (newTitle: string) => void;
  users: ChannelUser[];
  inviteUser: (user: ChannelUser) => void;
  removeUser: (id: string) => void;
  getSettingsForUser: (id: string) => {
    name: string;
    color: string;
    isOwner: boolean;
  } | null;
};

const ChannelContext = createContext({} as Context);

const ChannelContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ChannelData;
}) => {
  const [title, setTitle] = useState<string>(data.title);

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const [users, setUsers] = useState<ChannelUser[]>(data.users);

  const getSettingsForUser = (id: string) => {
    const user = users.find((u) => u._id === id);
    if (!user) return null;
    return {
      name: user.channelSettings.displayName ?? user.username,
      color:
        user.channelSettings.nameColor ??
        user.settings.defaultNameColor ??
        "var(--text)",
      isOwner: user._id === data.owner._id,
    };
  };

  const inviteUser = (user: ChannelUser) => {
    setUsers([...users, user]);
  };

  const removeUser = (id: string) => {
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <ChannelContext.Provider
      value={{
        id: data._id,
        title,
        updateTitle,
        users,
        inviteUser,
        removeUser,
        getSettingsForUser,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export { ChannelContext, ChannelContextProvider };
