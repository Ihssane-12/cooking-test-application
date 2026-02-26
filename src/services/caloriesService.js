export const getNutriBadge = (calories) => {
    if (calories < 400) return { color: '#A8E6A1', label: 'Healthy' };
    if (calories <= 800) return { color: '#FFD97D', label: 'Moderate' };
    return { color: '#FF8B8B', label: 'High Calorie' };
};

export const calculateTotalCalories = (favorites) => {
    return favorites.reduce((total, rec) => total + (rec.caloriesPerServing || 0), 0);
};