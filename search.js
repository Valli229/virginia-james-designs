// Search functionality script
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.srch');
    const searchBtn = document.querySelector('.btn');
    let searchResultsContainer = document.getElementById('search-results');

    // Create search results container if it doesn't exist
    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement('div');
        searchResultsContainer.id = 'search-results';
        searchResultsContainer.className = 'search-results-container';
        const navbar = document.querySelector('.navbar');
        navbar.parentNode.insertBefore(searchResultsContainer, navbar.nextSibling);
    }

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.style.display = 'none';
            clearHighlights();
            return;
        }

        // Get all text content from the page
        const pageContent = document.body.innerText;
        const lines = pageContent.split('\n');
        
        // Find matching lines
        const results = [];
        lines.forEach((line, index) => {
            if (line.toLowerCase().includes(searchTerm)) {
                results.push(line.trim());
            }
        });

        // Display results
        displayResults(results, searchTerm);
        
        // Highlight matching text on the page
        highlightMatches(searchTerm);
    }

    // Function to display search results
    function displayResults(results, searchTerm) {
        searchResultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `<div class="no-results">No results found for "${searchTerm}"</div>`;
        } else {
            let html = `<div class="search-results-header">Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${searchTerm}"</div>`;
            html += '<div class="search-results-list">';
            
            results.slice(0, 10).forEach((result, index) => {
                html += `<div class="search-result-item">${index + 1}. ${result}</div>`;
            });
            
            if (results.length > 10) {
                html += `<div class="search-result-more">... and ${results.length - 10} more results</div>`;
            }
            
            html += '</div>';
            searchResultsContainer.innerHTML = html;
        }
        
        searchResultsContainer.style.display = 'block';
    }

    // Function to highlight matches in the page
    function highlightMatches(searchTerm) {
        clearHighlights();
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToReplace = [];
        let node;
        
        while (node = walker.nextNode()) {
            if (regex.test(node.nodeValue)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach(node => {
            const span = document.createElement('span');
            span.innerHTML = node.nodeValue.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                '<mark class="highlight">$1</mark>'
            );
            node.parentNode.replaceChild(span, node);
        });
    }

    // Function to clear highlights
    function clearHighlights() {
        const highlights = document.querySelectorAll('mark.highlight');
        highlights.forEach(mark => {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
            parent.normalize();
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.style.display = 'none';
            clearHighlights();
        }
    });

    function showActionMessage(message, insertBeforeElement) {
        let content = insertBeforeElement ? insertBeforeElement.parentNode : document.querySelector('.content');
        if (!content) {
            content = document.body;
        }
        let messageElement = content.querySelector('.action-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'action-message';
            if (insertBeforeElement && insertBeforeElement.parentNode) {
                content.insertBefore(messageElement, insertBeforeElement);
            } else {
                content.insertBefore(messageElement, content.firstChild);
            }
        }
        messageElement.textContent = message;
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 2800);
    }

    const photoActionBlocks = document.querySelectorAll('.photo-actions');
    photoActionBlocks.forEach((section) => {
        const likeBtn = section.querySelector('.like-btn');
        const shareBtn = section.querySelector('.share-btn');
        const orderBtn = section.querySelector('.order-btn');
        const likeCount = section.querySelector('.like-count');
        let liked = false;
        let count = 0;

        if (likeBtn && likeCount) {
            likeBtn.addEventListener('click', function() {
                liked = !liked;
                if (liked) {
                    count += 1;
                    likeBtn.classList.add('liked');
                    likeBtn.innerHTML = `❤️ Liked <span class="like-count">${count}</span>`;
                    showActionMessage('You liked this photo.', section);
                } else {
                    count = Math.max(0, count - 1);
                    likeBtn.classList.remove('liked');
                    likeBtn.innerHTML = `❤️ Like <span class="like-count">${count}</span>`;
                    showActionMessage('Like removed.', section);
                }
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                const shareUrl = window.location.href;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(shareUrl).then(function() {
                        showActionMessage('Page link copied to clipboard.', section);
                    }).catch(function() {
                        showActionMessage('Share failed. Please copy the URL manually.', section);
                    });
                } else {
                    prompt('Copy this link to share:', shareUrl);
                }
            });
        }

        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                window.location.href = 'Order form.html';
            });
        }
    });
});
