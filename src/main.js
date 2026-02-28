import { getAllRecipes, searchRecipes } from './api/recipeProvider.js';
import { renderRecipes } from './ui/render.js';
import { saveFavorite, getFavorites } from './services/storageService.js';

const mainContent = document.getElementById('main-content');
const loadHome = async () => {
    mainContent.innerHTML = '<h2>History</h2><div id="recipe-list"></div>';
    const recipes = await getAllRecipes();
    renderRecipes(document.getElementById('recipe-list'), recipes);
};
const loadFavorites = () => {
    mainContent.innerHTML = '<h2>Favorite recipe</h2><div id="recipe-list"></div>';
    const favs = getFavorites();
    renderRecipes(document.getElementById('recipe-list'), favs, true);
};