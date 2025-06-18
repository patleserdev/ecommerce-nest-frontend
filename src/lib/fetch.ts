export default async function Fetch<T = any>({
  url,
  options,
}: {
  url: string;
  options?: RequestInit;
}): Promise<{ response: Response; data: T | null }> {
  // console.log(url,options)

  try {
    const safeOptions = {
      ...options,
      headers: {
        ...(options?.headers || {}),
        "Accept-Encoding": "identity", // Désactive compression
      },
    };

    const response = await fetch(url, safeOptions);

    let data: T | null = null;

    const contentType = response.headers.get("content-type");
    const text = await response.text();

    if (response.ok && contentType?.includes("application/json") && text) {
      data = JSON.parse(text);
    } else {
      console.warn(`Empty or non-JSON response from ${url}`);
    }

    return { response, data };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
