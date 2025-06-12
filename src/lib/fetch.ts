export default async function Fetch<T = any>({
  url,
  options,
}: {
  url: string;
  options?: RequestInit; // au lieu de {}|null
}): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      console.log(`HTTP error! status: ${response.status}`);
    }

    const result: T = await response.json();

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // on relance l'erreur pour laisser le contrôle à l'appelant
  }
}
