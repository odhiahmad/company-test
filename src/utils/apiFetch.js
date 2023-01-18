export async function filterFetch(url, options) {
  return await fetch(url, options)
    .then((respone) => {
      if (respone.status == 500) {
        throw new Error("Error Internal Server");
      }
      return respone.json();
    })
    .catch((err) => {
      throw new Error(err);
    })
    .then((json) => {
      return json;
    });
}
