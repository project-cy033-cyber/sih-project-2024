// Handle search form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const query = document.getElementById('searchBox').value.trim();

    if (query) {
        // Redirect to search results page with query parameter
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
});

// Display the search query on the search results page
window.addEventListener('DOMContentLoaded', (event) => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('q');

    if (query) {
        document.getElementById('searchQuery').textContent = query;
    }
});
