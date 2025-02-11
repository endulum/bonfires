import { useState } from "react";

import { doFetch } from "../functions/doFetch";
import { getStoredToken } from "../functions/tokenUtils";

type InputErrors = Array<{ path: string; value: string; msg: string }>;

export function useForm<T>(
  destination: { endpoint: string; method: "GET" | "PUT" | "POST" | "DELETE" },
  onSuccess: (
    // to run only when the request gets a 200
    submissionData: Record<string, string>, // do something with what you've given to the request
    submissionResult: T // do something with what you've received from the request
  ) => void
): {
  loading: boolean;
  error: string | null;
  inputErrors: Record<string, string> | null;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // one error message atop the form
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  // error messages per input

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const token = getStoredToken();

    // build a formData object by gathering values
    // from the event's own target, which is the HTML form
    const formData: Record<string, string> = {};
    Object.values(event.target).forEach((inputElement) => {
      if (
        (inputElement instanceof HTMLInputElement ||
          inputElement instanceof HTMLTextAreaElement ||
          inputElement instanceof HTMLButtonElement) &&
        inputElement.id !== ""
      ) {
        formData[inputElement.id] = inputElement.value;
      }
    });

    // start the request
    setLoading(true);
    setError(null);
    setInputErrors({});
    const fetchResult = await doFetch<T | { errors: InputErrors }>(
      destination.endpoint,
      {
        method: destination.method,
        headers: {
          "Content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      }
    );
    setLoading(false);

    if (fetchResult.error) {
      setError(fetchResult.error);
    }
    if (
      fetchResult.status === 400 &&
      typeof fetchResult.data === "object" &&
      fetchResult.data !== null &&
      "errors" in fetchResult.data
    ) {
      const inputErrorRecord: Record<string, string> = {};
      (fetchResult.data.errors as InputErrors).forEach((inputError) => {
        inputErrorRecord[inputError.path] = inputError.msg;
      });
      setInputErrors(inputErrorRecord);
      setError("There were some errors with your submission.");
    }

    if (fetchResult.status === 200) {
      onSuccess(formData, fetchResult.data as T);
    }
  }

  return {
    loading,
    error,
    inputErrors,
    handleSubmit,
  };
}
