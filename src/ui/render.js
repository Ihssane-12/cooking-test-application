const card = document.createElement('div');
card.className = 'recipe-card';
const badge = getNutriBadge(recipe.caloriesPerServing);
<i class="fas fa-heart fav-btn ${isFavPage ? 'active' : ''}" data-id="${recipe.id}"></i>
card.addEventListener('click', (e) => {
    if(!e.target.classList.contains('fav-btn')) showModal(recipe);
});
export const showModal = (recipe) => {
    dynamicContent = `
<div class="details-grid">
    <div class="recipe-details">
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
        <div class="badge" style="background-color: ${badge.color};">${badge.label}</div>
    </div>
</div>`;
    document.getElementById('dynamic-content').innerHTML = dynamicContent;
};