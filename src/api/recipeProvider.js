const API_URL = "https://dummyjson.com/recipes";

export const getAllRecipes = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.recipes;
};

export const searchRecipes = async (query) => {
    const response = await fetch(`${API_URL}/search?q=${query}`);
    const data = await response.json();
    return data.recipes;
};