import { useState, useEffect } from "react";
import { FirstPage, LastPage } from "@mui/icons-material";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "./LoadingSpacer";

interface PagedResults {
  links: {
    nextPage: string | null;
    prevPage: string | null;
  };
}

export function Paginator<T>({
  startingUrl,
  itemsPropertyName,
  mapItems,
  emptyElement,
}: {
  startingUrl: string;
  itemsPropertyName: string;
  mapItems: (item: T) => JSX.Element | undefined;
  emptyElement: JSX.Element;
}) {
  const [url, setUrl] = useState(startingUrl);

  const { loading, error, data, get } = useGet<
    PagedResults & {
      [resultPropertyName: string]: Array<T>;
    }
  >(url);

  useEffect(() => {
    get();
  }, [url]);

  useEffect(() => {
    setUrl(startingUrl);
  }, [startingUrl]);

  return (
    <>
      {/* items */}
      <div>
        {data ? (
          data[itemsPropertyName].length > 0 ? (
            data[itemsPropertyName].map((result) => mapItems(result))
          ) : (
            emptyElement
          )
        ) : (
          <LoadingSpacer
            loading={loading}
            error={error}
            customLoadingText="Finding..."
          />
        )}
      </div>

      {/* page buttons */}
      <hr className="mb-1" />
      <div className="flex-row jc-spb">
        <button
          className="button plain"
          disabled={data == null || data?.links.prevPage === null}
          onClick={() => {
            if (data?.links.prevPage) setUrl(data.links.prevPage);
          }}
          title="Previous results"
        >
          <FirstPage />
        </button>
        <button
          className="button plain"
          disabled={data == null || data?.links.nextPage === null}
          onClick={() => {
            if (data?.links.nextPage) setUrl(data.links.nextPage);
          }}
          title="More results"
        >
          <LastPage />
        </button>
      </div>
    </>
  );
}
