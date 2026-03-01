import { getAllRecipes, searchRecipes } from './api/recipeProvider.js';
import { renderRecipes } from './ui/render.js';
import { saveFavorite, getFavorites } from './services/storageService.js';
import { toggleLoader } from './ui/loader.js';

const mainContent = document.getElementById('main-content');



// src/main.js

const loadHome = async () => {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = '<h2>History</h2><div id="recipe-list"></div>';
    const container = document.getElementById('recipe-list');

    toggleLoader(true, loadHome); 

    try {
        const data = await getAllRecipes(); 
        
        if (data && data.length > 0 && container) {
            renderRecipes(container, data);
            // Kan-7bso l-loader ghir ila l-data jat
            toggleLoader(false); 
        }
    } catch (e) {
        console.error("Connection Error:", e);
    }
};const loadFavorites = () => {
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
    
    document.getElementById('search-input').addEventListener('input', async (e) => {
        const query = e.target.value;
        if(query.length > 2) {
            const results = await searchRecipes(query);
            renderRecipes(document.getElementById('search-results'), results);
        }
    });
};

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

loadHome();

document.addEventListener('click', async (e) => {
    if(e.target.classList.contains('fav-btn')) {
        const id = e.target.dataset.id;
        const recipes = await getAllRecipes();
        const recipe = recipes.find(r => r.id == id);
        saveFavorite(recipe);
        e.target.classList.add('active');
    }
});
