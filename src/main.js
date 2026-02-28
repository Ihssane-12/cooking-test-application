import { getAllRecipes, searchRecipes } from './api/recipeProvider.js';
import { renderRecipes } from './ui/render.js';
import { saveFavorite, getFavorites } from './services/storageService.js';

const mainContent = document.getElementById('main-content');