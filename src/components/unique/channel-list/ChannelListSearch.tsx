import { useRef } from "react";

export function ChannelListSearch({
  search,
}: {
  search: (title: string) => void;
}) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      search(e.target.value);
    }, 750);
  };

  return (
    <form onChange={handleChange} className="flex-row g-1 mb-1">
      <label htmlFor="title" className="mw-mxc">
        Search by title
      </label>
      <input type="text" id="title" />
    </form>
  );
}
