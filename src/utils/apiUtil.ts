
export type apiMethod = "GET" | "POST" | "PUT" | "DELETE"

export async function fetchData(api: string, method: apiMethod, body?: any ) {

   const headers: Record<string, string> = {'Content-Type': 'application/json;charset=utf-8'}

   const token = localStorage.getItem("token");

   if(token) {
    headers.Authorization = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method,
        headers,
      };
      
      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(api, options);


      if(!response.ok) {
        throw new Error("Data fetching error")
      }

      if (response.status === 204) {
        return null;
      }

      const data = await response.json()
      return data
  }

  export const loadPosts = async () => {
    const posts = await fetchData("/api/posts", "GET");
    return posts
  };

