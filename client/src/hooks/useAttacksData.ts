import { useState, useEffect } from "react";

interface Step {
  phase: number;
  title: string;
  description: string;
  command: string;
  explanation: string;
}

interface Attack {
  id: string;
  name: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  steps: Step[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  attacks: Attack[];
}

interface AttacksData {
  categories: Category[];
}

export function useAttacksData() {
  const [data, setData] = useState<AttacksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/attacks-data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
