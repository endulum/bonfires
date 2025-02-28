export type MongoObject = {
  _id: string;
};

export type User = MongoObject & {
  username: string;
};

export type UserData = User & {
  tagline?: string;
  ghId: number;
  ghUser: string;
  joined: string;
  settings: UserSettings;
};

export type UserSettings = {
  defaultNameColor?: string;
  defaultInvisible: boolean;
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
    invisible?: boolean;
  };
};

export type MessageData = MongoObject & {
  pinned: boolean;
  timestamp: string;
  user: User;
  content: string;
};

export type ChannelEvent = MongoObject & {
  user: User;
  targetUser: User;
  timestamp: string;
  type:
    | "user_invite"
    | "user_kick"
    | "user_leave"
    | "channel_title"
    | "channel_avatar"
    | "message_pin";
  newChannelTitle: string;
};
