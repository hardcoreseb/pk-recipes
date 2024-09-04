document.addEventListener("DOMContentLoaded", function() {
    const topicFilter = document.getElementById('topic-filter');
    const sortFilter = document.getElementById('sort-filter');
    const recipes = document.querySelectorAll('.list-anchor');

    //Original order of recipes
    const originalOrder = Array.from(recipes);
    
    //Check if website is seen on phone or something bigger (tablet, dekstop)
    function getScreenSize() {
        if (window.matchMedia("(max-width: 576px)").matches) {
            return 'flex';
        }
        else {
            return 'grid';
        }
    }

    function filterRecipes() {
        const selectedTopic = topicFilter.value;

        recipes.forEach(function(recipe) {
            const topicElement = recipe.querySelector('.topic-name span:nth-child(2)');
            const recipeTopic = topicElement.textContent.trim();

            if (selectedTopic === 'All' || recipeTopic === selectedTopic || recipeTopic.includes(selectedTopic)) {
                recipe.style.display = getScreenSize(); // Show recipe
            }
            else {
                recipe.style.display = 'none'; // Hide recipe
            }
        })

        sortRecipes();
    }

    function sortRecipes() {
        const selectedSort = sortFilter.value;
        const recipeArray = Array.from(recipes);
    
        if (selectedSort === 'time') {
            recipeArray.sort((a, b) => {
                const timeA = convertToMinutes(a.querySelector('.time span:nth-child(2)').textContent);
                const timeB = convertToMinutes(b.querySelector('.time span:nth-child(2)').textContent);
                return timeA - timeB;
            });
        } else if (selectedSort === 'language') {
            recipeArray.sort((a, b) => {
                const langA = a.querySelector('.lang img').alt.toLowerCase();
                const langB = b.querySelector('.lang img').alt.toLowerCase();
                return langA.localeCompare(langB);
            });
        } else {
            // Default sorting (original order)
            recipeArray.sort((a, b) => {
                return originalOrder.indexOf(a) - originalOrder.indexOf(b);
            });
        }
    
        // Re-append sorted recipes to the DOM
        const parentElement = recipes[0].parentElement;
        recipeArray.forEach(recipe => parentElement.appendChild(recipe));
    }
    
    function convertToMinutes(timeString) {
        let totalMinutes = 0;
    
        const hourMatch = timeString.match(/(\d+)\s*h/);
        const minuteMatch = timeString.match(/(\d+)\s*mins?/);
    
        if (hourMatch) {
            totalMinutes += parseInt(hourMatch[1]) * 60;
        }
        if (minuteMatch) {
            totalMinutes += parseInt(minuteMatch[1]);
        }
    
        return totalMinutes;
    }

    topicFilter.addEventListener('change', filterRecipes);
    sortFilter.addEventListener('change', filterRecipes); // Re-filter to ensure correct sorting is applied

    filterRecipes(); // Initial run
    window.addEventListener('resize', filterRecipes);
});