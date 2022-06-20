import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: any | undefined;
}

type UseMutationResult<T> = [(data?: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function stateHelper(key: keyof UseMutationState<T>, value: any) {
    setState((state) => {
      return { ...state, [key]: value };
    });
  }
  function mutation(data: any) {
    stateHelper("loading", true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((res) => stateHelper("data", res))
      .catch((err) => stateHelper("error", err))
      .finally(() => {
        stateHelper("loading", false);
      });
  }

  return [mutation, { ...state }];
}
