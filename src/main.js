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
const loadSearch = () => {
    mainContent.innerHTML = `
        <h2>Search recipe</h2>
        <div class="search-bar">
            <input type="text" id="search-input" placeholder="Tap here to search...">
        </div>
        <div id="search-results"></div>
    `;
};
document.getElementById('search-input').addEventListener('input', async (e) => {
    const query = e.target.value;
    if(query.length > 2) {
        const results = await searchRecipes(query);
        renderRecipes(document.getElementById('search-results'), results);
    }
});
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.nav-item.active').classList.remove('active');
        item.classList.add('active');
        const page = item.dataset.page;
        if(page === 'home') loadHome();
        if(page === 'favorite') loadFavorites();
        if(page === 'search') loadSearch();
    });
});