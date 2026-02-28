export const saveFavorite = (recipe) => {
    let favs = JSON.parse(localStorage.getItem('favs')) || [];
    if (!favs.some(r => r.id === recipe.id)) {
        localStorage.setItem('favs', JSON.stringify(favs));
};
}
export const getFavorites = () => JSON.parse(localStorage.getItem('favs')) || [];
export const removeFavorite = (id) => {
    
}
