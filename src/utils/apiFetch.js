export async function filterFetch(url, options) {
  return await fetch(url, options)
    .then((respone) => {
      console.log(respone);
      if (respone.status == 500) {
        throw new Error("Error Internal Server");
      }
      return respone.json();
    })
    .catch((err) => {
      throw new Error("Error Internal Server");
    })
    .then((json) => {
      return json;
    });
}
