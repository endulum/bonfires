import { useRef } from "react";

export function useLiveAvatar(baseURL: string) {
  const avatarRef = useRef<HTMLImageElement | null>(null);

  const resetAvatar = () => {
    if (avatarRef.current) {
      const timestamp = new Date().getTime();
      // add timestamp to bust cache
      avatarRef.current.src = `${baseURL}?${timestamp}`;
    }
  };

  return {
    baseURL,
    avatarRef,
    resetAvatar,
  };
}
