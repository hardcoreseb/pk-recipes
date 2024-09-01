document.addEventListener("DOMContentLoaded", function() {
    const topicFilter = document.getElementById('topic-filter');
    const recipes = document.querySelectorAll('.list-anchor');
    
    //Check if website is seen on phone or something bigger (tablet, dekstop)
    function getScreenSize() {
        if (window.matchMedia("(max-width: 576px)").matches) {
            return 'flex';
        }
        else {
            return 'grid';
        }
    }

    topicFilter.addEventListener('change', function() {
        const selectedTopic = this.value;

        recipes.forEach(function(recipe) {
            const topicElement = recipe.querySelector('.topic-name span:nth-child(2)');
            const recipeTopic = topicElement.textContent.trim();

            if (selectedTopic === 'All' || recipeTopic === selectedTopic || recipeTopic.includes(selectedTopic)) {
                recipe.style.display = getScreenSize(); // Show recipe
            } else {
                recipe.style.display = 'none'; // Hide recipe
            }
        });
    });
});