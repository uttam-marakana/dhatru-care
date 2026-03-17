import { useEffect, useState } from "react";
import { getPackages } from "../api/packagesApi";

let packagesCache = null;

export default function usePackages() {
  const [packages, setPackages] = useState(packagesCache || []);
  const [loading, setLoading] = useState(!packagesCache);

  useEffect(() => {
    if (packagesCache) return;

    getPackages().then((data) => {
      packagesCache = data;
      setPackages(data);
      setLoading(false);
    });
  }, []);

  return { packages, loading };
}
