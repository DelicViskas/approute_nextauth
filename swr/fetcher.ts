export const goodsURL = "/api/goods";
export const favoritesURL = "/api/favorites";

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

