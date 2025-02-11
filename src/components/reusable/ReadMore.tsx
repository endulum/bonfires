import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ReadMore({
  link,
  children,
  maxHeight = 250,
}: {
  link: string;
  children: React.ReactNode;
  maxHeight?: number;
}) {
  const [height, setHeight] = useState<number>(0);
  const readmoreContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (readmoreContent.current)
      setHeight(readmoreContent.current.scrollHeight);
  }, []);
  return (
    <>
      <div className="readmore" style={{ maxHeight: `${maxHeight}px` }}>
        <div className="readmore-content" ref={readmoreContent}>
          {children}
        </div>

        {height > maxHeight && <div className="readmore-fade" />}
      </div>

      {height > maxHeight && (
        <div className="readmore-link mt-0-5">
          <Link to={link}>
            <small>Read more</small>
          </Link>
        </div>
      )}
    </>
  );
}
