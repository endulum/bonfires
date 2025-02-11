import { useRef, useState } from "react";

import { Paginator } from "./Paginator";

export function Search<T>({
  startingParams,
  endpoint,
  formContent,
  itemsPropertyName,
  mapItems,
  emptyElement,
}: {
  startingParams: Record<string, string>;
  endpoint: string;
  formContent: JSX.Element;
  // props for the Paginator, because this component wraps around it
  itemsPropertyName: string;
  mapItems: (item: T) => JSX.Element | undefined;
  emptyElement: JSX.Element;
}) {
  // delay between form changes
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  // keep params as an record outside of component flow
  const params = useRef<Record<string, string>>(startingParams ?? {});

  // helper to turn params into query string
  const paramsToString = () => {
    const trimmedParams = Object.fromEntries(
      Object.entries(params.current).filter(([_key, value]) => value !== "")
    );
    return new URLSearchParams(trimmedParams).toString();
  };

  // use url as state
  const [url, setUrl] = useState(`${endpoint}?${paramsToString()}`);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (!params.current) return;
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      params.current = {
        ...params.current,
        [e.target.id]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
      setUrl(`${endpoint}?${paramsToString()}`);
    }, 750);
  };

  return (
    <>
      <form
        className="search"
        onSubmit={(e) => e.preventDefault}
        onChange={handleChange}
      >
        {formContent}
      </form>
      <hr className="mt-1" />
      <Paginator<T>
        startingUrl={url}
        itemsPropertyName={itemsPropertyName}
        mapItems={mapItems}
        emptyElement={emptyElement}
      />
    </>
  );
}
