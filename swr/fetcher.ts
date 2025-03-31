export const goodsURL = "/api/goods";
export const favoritesURL = "/api/favorites";
export const myGoodsURL = "/api/mygoods";
export const countFavorites = "/api/countFavorites";
export const messagesURL = "/api/messages";
export const adminGoodsURL = "/api/admin/goods";
export const adminCategoriesURL = "/api/admin/categories";
export const adminUsersURL = "/api/admin/users";

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

