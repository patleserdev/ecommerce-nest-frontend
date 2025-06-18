export default async function Fetch<T = any>({
  url,
  options,
}: {
  url: string;
  options?: RequestInit;
}): Promise<{ response: Response; data: T }> {
 // console.log(url,options)
  
  try {

    const safeOptions = {
      ...options,
      headers: {
        ...(options?.headers || {}),
        'Accept-Encoding': 'identity', // Désactive compression
      },
    };

    const response = await fetch(url, safeOptions);
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
