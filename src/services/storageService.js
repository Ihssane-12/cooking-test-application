export const saveFavorite = (recipe) => {
    let favs = JSON.parse(localStorage.getItem('favs')) || [];
    if (!favs.find(r => r.id === recipe.id)) {
        favs.push(recipe);
        localStorage.setItem('favs', JSON.stringify(favs));
    }
};

export const getFavorites = () => JSON.parse(localStorage.getItem('favs')) || [];

export const removeFavorite = (id) => {
    let favs = getFavorites();
    favs = favs.filter(r => r.id !== id);
    localStorage.setItem('favs', JSON.stringify(favs));
};