export const getNutriBadge = (calories) => {
    if (calories < 400) {
        return { color: '#A8E6A1', label: `${calories} kcal` }; 
    } 
    if (calories <= 800) {
        return { color: '#FFD97D', label: `${calories} kcal` }; 
    }
    return { color: '#FF8B8B', label: `${calories} kcal` };     
};

export const calculateTotalCalories = (favorites) => {
    return favorites.reduce((total, rec) => total + (rec.caloriesPerServing || 0), 0);
};