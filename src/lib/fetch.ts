export default async function Fetch<T = any>({
  url,
  options,
}: {
  url: string;
  options?: RequestInit;
}): Promise<{ response: Response; data: T }> {

  try {
    const response = await fetch(url, options);
    let data=null
    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.json();
    }
 

    return { response, data };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
