export type MongoObject = {
  _id: string;
};

export type User = MongoObject & {
  username: string;
};

export type UserData = User & {
  status?: string;
  ghId: number;
  ghUser: string;
  joined: string;
  settings: UserSettings;
};

export type UserSettings = {
  defaultNameColor?: string;
  defaultVisible: boolean;
};

export type Channel = MongoObject & {
  title: string;
  owner: string;
  users: string[];
  lastActivity: string;
};

export type ChannelData = MongoObject & {
  title: string;
  owner: User;
  users: ChannelUser[];
};

export type ChannelUser = UserData & {
  channelSettings: {
    displayName?: string;
    nameColor?: string;
    visible?: boolean;
  };
};
