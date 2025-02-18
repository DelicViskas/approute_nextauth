export const goodsURL = "/api/goods";
export const favoritesURL = "/api/favorites";
export const mynoticesURL = "/api/mynotices";

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

