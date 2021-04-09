// submit button click handler
document.getElementById("searchBtn").addEventListener("click", function () {
    const inputValue = document.getElementById("search-input");
    const warnings = document.getElementById("warning");
    const results = document.getElementById("result");
    if (inputValue.value === "") {
        warnings.style.display = 'block'
    } else {
        displayFoodItem(inputValue.value);
        warnings.style.display = 'none'
        results.style.display = 'block'

    }
})

function displayFoodItem(input) {
    // Api
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res => res.json())
        .then(data => displayMealsItems(data.meals))
}

// all fodd items
const displayMealsItems = meal => {
    const allMealsDiv = document.getElementById("meals-items");
    meal.forEach(allMeal => {
        const singleItemsDiv = document.createElement("div");
        singleItemsDiv.className = 'single-items'
        const mealInfo = `
            <img onclick="displayFoodDetails('${allMeal.strMeal}')" src="${allMeal.strMealThumb}">
            <h4 onclick="displayFoodDetails('${allMeal.strMeal}')">${allMeal.strMeal}</h4>
        `;
        singleItemsDiv.innerHTML = mealInfo;
        allMealsDiv.appendChild(singleItemsDiv);
    });
}

// food details
const displayFoodDetails = name => {
    // Api
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderFoodInfo(data.meals[0]))
};

const renderFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img src="${food.strMealThumb}" alt="">
    <div class="details">
        <h4>${food.strMeal}</h4>
        
        <h5 class="pt-3 pb-2">Ingredients</h5>
        <ul class="list-unstyled mb-0">
            <li>${food.strMeasure1}, ${food.strIngredient1}</li>
            <li>${food.strMeasure2}, ${food.strIngredient2}</li>
            <li>${food.strMeasure3}, ${food.strIngredient3}</li>
            <li>${food.strMeasure4}, ${food.strIngredient4}</li>
        </ul>
    </div>

`;
};