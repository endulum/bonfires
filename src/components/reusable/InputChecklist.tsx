import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { CheckCircle, Cancel } from "@mui/icons-material";

export function InputChecklist({
  input,
  requirements,
}: {
  input: JSX.Element;
  requirements: Array<{
    description: string;
    function: (input: string) => boolean;
  }>;
}) {
  const { value: reqsVisible, setTrue: makeReqsVisible } = useBoolean(false);
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <>
      <input
        {...input.props}
        onFocus={(e) => {
          if (!reqsVisible) {
            setInputValue(e.target.value);
            makeReqsVisible();
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {reqsVisible ? (
        <ul className="form-input-checklist">
          {requirements.map((req) => (
            <li
              key={req.description}
              className={`flex-row  gap-0-5 ${
                req.function(inputValue) === true ? " good" : " missing"
              }`}
            >
              {req.function(inputValue) === true ? (
                <CheckCircle aria-label="This requirement is fulfilled." />
              ) : (
                <Cancel aria-label="This requirement is missing." />
              )}
              <p>{req.description} </p>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
