
type apiMethod = "GET" | "POST" | "PUT" | "DELETE"
  export async function fetchData(api: string, method: apiMethod, body?: any ) {

   const headers: Record<string, string> = {'Content-Type': 'application/json;charset=utf-8'}

   const token = localStorage.getItem("token");

   if(token) {
    headers.Authorization = `Bearer ${token}`;
    }

    let response = await fetch(api, {
        method: method,
        headers: {...headers},
        body: JSON.stringify(body)
      });

      if(!response.ok) {
        throw new Error("Data fetching error")
      }

      const data = response.json()
      console.log(data)
      return data
  }