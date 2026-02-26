import { getNutriBadge } from '../services/caloriesService.js';

export const renderRecipes = (container, recipes, isFavPage = false) => {
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const badge = getNutriBadge(recipe.caloriesPerServing);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="info">
                <h3>${recipe.name}</h3>
                <div class="meta">
                    <i class="far fa-clock"></i> ${recipe.prepTimeMinutes} min
                </div>
                <div class="ingredients-count">${recipe.ingredients.length} ingredients</div>
            </div>
            <i class="fas fa-heart fav-btn ${isFavPage ? 'active' : ''}" data-id="${recipe.id}"></i>
            <span class="badge" style="background:${badge.color}">${badge.label}</span>
        `;
        
        // Clic sur la carte pour les détails
        card.addEventListener('click', (e) => {
            if(!e.target.classList.contains('fav-btn')) showModal(recipe);
        });

        container.appendChild(card);
    });
};

export const showModal = (recipe) => {
    const modal = document.getElementById('recipe-modal');
    modal.classList.remove('hidden');

    // Initial render m3a la section "Details" hiya l-lowla
    updateModalContent(recipe, 'details');
};

const updateModalContent = (recipe, section) => {
    const modal = document.getElementById('recipe-modal');
    
    // Contenu dyal kola section
    let dynamicContent = '';
    if (section === 'ingredients') {
        dynamicContent = `<ul class="list-data">${recipe.ingredients.map(ing => `<li>• ${ing}</li>`).join('')}</ul>`;
    } else if (section === 'instruction') {
        dynamicContent = `<ol class="list-data">${recipe.instructions.map(ins => `<li>${ins}</li>`).join('')}</ol>`;
    } else {
        // Section Details (kif f figma)
        dynamicContent = `
            <div class="details-grid">
                <div class="detail-item">
                    <p class="label green-text">Calories 🔥</p>
                    <p class="value">${recipe.caloriesPerServing} kcal</p>
                </div>
                <div class="detail-item">
                    <p class="label green-text">Prep ⏱️</p>
                    <p class="value">${recipe.prepTimeMinutes} min</p>
                </div>
                <div class="detail-item">
                    <p class="label green-text">Cook 🍳</p>
                    <p class="value">${recipe.cookTimeMinutes} min</p>
                </div>
                <div class="detail-item">
                    <p class="label green-text">Rating ⭐</p>
                    <p class="value">${recipe.rating}</p>
                </div>
            </div>
        `;
    }

    modal.innerHTML = `
        <div class="modal-content full-screen">
            <span class="close-btn">&times;</span>
            <div class="recipe-hero" style="background-image: url('${recipe.image}')">
                <h1 class="recipe-title-overlay">${recipe.name}</h1>
            </div>
            
            <div class="tabs-container">
                <button class="tab-btn ${section === 'ingredients' ? 'active' : ''}" data-type="ingredients">Ingredients</button>
                <button class="tab-btn ${section === 'details' ? 'active' : ''}" data-type="details">Details</button>
                <button class="tab-btn ${section === 'instruction' ? 'active' : ''}" data-type="instruction">Instruction</button>
            </div>

            <div class="tab-content-area">
                ${dynamicContent}
            </div>
        </div>
    `;

    // Event Listeners l les boutons dyal les onglets
    modal.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => updateModalContent(recipe, btn.dataset.type);
    });

    // Fermer la modale
    modal.querySelector('.close-btn').onclick = () => modal.classList.add('hidden');
};
