import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data: any | undefined;
  error: any | undefined;
}

type UseMutationResult = [(data?: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function stateHelper(key: keyof UseMutationState, value: any) {
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
