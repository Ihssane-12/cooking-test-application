const card = document.createElement('div');
card.className = 'recipe-card';
const badge = getNutriBadge(recipe.caloriesPerServing);
<i class="fas fa-heart fav-btn ${isFavPage ? 'active' : ''}" data-id="${recipe.id}"></i>