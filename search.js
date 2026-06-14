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

    const imageCatalog = [
        // Bridal
        { src: 'BRIDAL-1.jpg', alt: 'Bridal Wear', title: 'Bridal', keywords: ['bridal', 'wedding', 'dress', 'bride', 'gown'] },
        { src: 'BRIDAL-2.jpg', alt: 'Bridal Dress', title: 'Bridal', keywords: ['bridal', 'wedding', 'dress', 'bride'] },
        { src: 'BRIDAL-3.jpg', alt: 'Bridal Gown', title: 'Bridal', keywords: ['bridal', 'wedding', 'gown', 'bride'] },
        { src: 'BRIDAL-4.jpg', alt: 'Bridal Collection', title: 'Bridal', keywords: ['bridal', 'wedding', 'collection'] },
        { src: 'BRIDAL-5.jpg', alt: 'Bridal Design', title: 'Bridal', keywords: ['bridal', 'wedding', 'design'] },
        { src: 'BRIDAL-6.jpg', alt: 'Bridal Style', title: 'Bridal', keywords: ['bridal', 'wedding', 'style'] },
        { src: 'BRIDAL-7.jpg', alt: 'Bridal Wear', title: 'Bridal', keywords: ['bridal', 'wedding', 'wear'] },
        { src: 'BRIDAL-8.jpg', alt: 'Bridal Couture', title: 'Bridal', keywords: ['bridal', 'couture'] },
        { src: 'BRIDAL-9.jpg', alt: 'Bridal Fashion', title: 'Bridal', keywords: ['bridal', 'fashion'] },
        { src: 'BRIDAL-10.jpg', alt: 'Bridal Outfit', title: 'Bridal', keywords: ['bridal', 'outfit'] },
        { src: 'BRIDAL-11.jpg', alt: 'Bridal', title: 'Bridal', keywords: ['bridal'] },
        { src: 'BRIDAL-12.jpg', alt: 'Bridal', title: 'Bridal', keywords: ['bridal'] },
        
        // Men's Wear
        { src: 'MENS-WEAR-2.jpg', alt: 'Mens Wear', title: 'Mens Wear', keywords: ['mens', 'men', 'wear', 'gents'] },
        { src: 'MENS-WEAR-3.jpg', alt: 'Mens Clothing', title: 'Mens Wear', keywords: ['mens', 'men', 'clothing', 'shirt'] },
        { src: 'MENS-WEAR-4.jpg', alt: 'Mens Fashion', title: 'Mens Wear', keywords: ['mens', 'men', 'fashion'] },
        { src: 'MENS-WEAR-5.jpg', alt: 'Mens Style', title: 'Mens Wear', keywords: ['mens', 'men', 'style'] },
        { src: 'MENS-WEAR-7.jpg', alt: 'Mens Outfit', title: 'Mens Wear', keywords: ['mens', 'men', 'outfit'] },
        { src: 'MENS-WEAR-8.jpg', alt: 'Mens Design', title: 'Mens Wear', keywords: ['mens', 'men', 'design'] },
        { src: 'MENS-WEAR-9.jpg', alt: 'Mens Collection', title: 'Mens Wear', keywords: ['mens', 'men', 'collection'] },
        { src: 'MENS-WEAR.jpg', alt: 'Mens Wear', title: 'Mens Wear', keywords: ['mens', 'men', 'wear'] },
        { src: 'MENS-WEAR-6.jpg', alt: 'Mens Wear', title: 'Mens Wear', keywords: ['mens', 'men', 'wear'] },
        
        // Women's Wear
        { src: 'WOMEN-WEAR-1.jpg', alt: 'Womens Wear', title: 'Womens Wear', keywords: ['women', 'women wear', 'female', 'dress'] },
        { src: 'WOMEN-WEAR-2.jpg', alt: 'Womens Fashion', title: 'Womens Wear', keywords: ['women', 'fashion', 'female'] },
        { src: 'WOMEN-WEAR-3.jpg', alt: 'Womens Style', title: 'Womens Wear', keywords: ['women', 'style', 'female'] },
        { src: 'WOMEN-WEAR-4.jpg', alt: 'Womens Outfit', title: 'Womens Wear', keywords: ['women', 'outfit'] },
        { src: 'WOMEN-WEAR-5.jpg', alt: 'Womens Design', title: 'Womens Wear', keywords: ['women', 'design'] },
        { src: 'WOMEN-WEAR-6.jpg', alt: 'Womens Collection', title: 'Womens Wear', keywords: ['women', 'collection'] },
        { src: 'WOMEN-WEAR-7.jpg', alt: 'Womens Clothing', title: 'Womens Wear', keywords: ['women', 'clothing'] },
        { src: 'WOMEN-WEAR-8.jpg', alt: 'Womens Apparel', title: 'Womens Wear', keywords: ['women', 'apparel'] },
        { src: 'WOMEN-WEAR-9.jpg', alt: 'Womens Wear', title: 'Womens Wear', keywords: ['women', 'wear'] },
        { src: 'WOMEN-WEAR-10.jpg', alt: 'Womens Dress', title: 'Womens Wear', keywords: ['women', 'dress'] },
        { src: 'WOMEN-WEAR-11.jpg', alt: 'Womens Gown', title: 'Womens Wear', keywords: ['women', 'gown'] },
        { src: 'WOMEN-WEAR-12.jpg', alt: 'Womens Fashion', title: 'Womens Wear', keywords: ['women', 'fashion'] },
        { src: 'WOMEN-WEAR-13.jpg', alt: 'Womens Style', title: 'Womens Wear', keywords: ['women', 'style'] },
        { src: 'WOMEN-WEAR-14.jpg', alt: 'Womens Outfit', title: 'Womens Wear', keywords: ['women', 'outfit'] },
        { src: 'WOMEN-WEAR-15.jpg', alt: 'Womens Design', title: 'Womens Wear', keywords: ['women', 'design'] },
        { src: 'WOMEN-WEAR-16.jpg', alt: 'Womens Collection', title: 'Womens Wear', keywords: ['women', 'collection'] },
        { src: 'WOMEN-WEAR-17.jpg', alt: 'Womens Apparel', title: 'Womens Wear', keywords: ['women', 'apparel'] },
        { src: 'WOMEN-WEAR-18.jpg', alt: 'Womens Wear', title: 'Womens Wear', keywords: ['women', 'wear'] },
        { src: 'WOMEN-WEAR-19.jpg', alt: 'Womens Fashion', title: 'Womens Wear', keywords: ['women', 'fashion'] },
        { src: 'WOMEN-WEAR-20.jpg', alt: 'Womens Style', title: 'Womens Wear', keywords: ['women', 'style'] },
        { src: 'WOMEN-WEAR-21.jpg', alt: 'Womens Design', title: 'Womens Wear', keywords: ['women', 'design'] },
        { src: 'WOMEN-WEAR-22.jpg', alt: 'Womens Outfit', title: 'Womens Wear', keywords: ['women', 'outfit'] },
        { src: 'WOMEN-WEAR-23.jpg', alt: 'Womens Collection', title: 'Womens Wear', keywords: ['women', 'collection'] },
        { src: 'WOMEN-WEAR-24.jpg', alt: 'Womens Clothing', title: 'Womens Wear', keywords: ['women', 'clothing'] },
        { src: 'WOMEN-WEAR-26.jpg', alt: 'Womens Dress', title: 'Womens Wear', keywords: ['women', 'dress'] },
        { src: 'WOMEN-WEAR-27.jpg', alt: 'Womens Gown', title: 'Womens Wear', keywords: ['women', 'gown'] },
        { src: 'WOMEN-WEAR-28.jpg', alt: 'Womens Apparel', title: 'Womens Wear', keywords: ['women', 'apparel'] },
        { src: 'WOMEN-WEAR-29.jpg', alt: 'Womens Fashion', title: 'Womens Wear', keywords: ['women', 'fashion'] },
        { src: 'WOMEN-WEAR-30.jpg', alt: 'Womens Style', title: 'Womens Wear', keywords: ['women', 'style'] },
        { src: 'WOMEN-WEAR-31.jpg', alt: 'Womens Design', title: 'Womens Wear', keywords: ['women', 'design'] },
        { src: 'WOMEN-WEAR-32.jpg', alt: 'Womens Collection', title: 'Womens Wear', keywords: ['women', 'collection'] },
        { src: 'WOMEN-WEAR-33.jpg', alt: 'Womens Outfit', title: 'Womens Wear', keywords: ['women', 'outfit'] },
        { src: 'WOMEN-WEAR-34.jpg', alt: 'Womens Clothing', title: 'Womens Wear', keywords: ['women', 'clothing'] },
        { src: 'WOMEN-WEAR-36.jpg', alt: 'Womens Apparel', title: 'Womens Wear', keywords: ['women', 'apparel'] },
        { src: 'WOMEN-WEAR-25.jpg', alt: 'Womens Fashion', title: 'Womens Wear', keywords: ['women', 'fashion'] },
        
        // T-Shirts & Shirts
        { src: 'T-SHIRTS-1.jpg', alt: 'T-Shirts', title: 'T-Shirts', keywords: ['tshirt', 't-shirt', 'casual', 'shirt'] },
        { src: 'SHIRTS-1.jpg', alt: 'Shirts', title: 'Shirts', keywords: ['shirt', 'shirts', 'tops'] },
        { src: 'SHIRTS-3.jpg', alt: 'Shirt Collection', title: 'Shirts', keywords: ['shirt', 'collection'] },
        { src: 'SHIRTS-4.jpg', alt: 'Shirt Design', title: 'Shirts', keywords: ['shirt', 'design'] },
        { src: 'SHIRTS-5.jpg', alt: 'Shirt Style', title: 'Shirts', keywords: ['shirt', 'style'] },
        { src: 'SHIRTS-8.jpg', alt: 'Shirt Fashion', title: 'Shirts', keywords: ['shirt', 'fashion'] },
        { src: 'SHIRTS-9.jpg', alt: 'Shirt Wear', title: 'Shirts', keywords: ['shirt', 'wear'] },
        { src: 'SHIRTS-10.jpg', alt: 'Shirt Outfit', title: 'Shirts', keywords: ['shirt', 'outfit'] },
        { src: 'SHIRTS-4.jpg', alt: 'Shirt', title: 'Shirts', keywords: ['shirt'] },
        { src: 'SHIRTS-2.jpg', alt: 'Sheets', title: 'Sheets', keywords: ['sheet', 'bed', 'linen'] },
        
        // School Uniforms
        { src: 'SCHOOL-UNIFORMS.jpg', alt: 'School Uniforms', title: 'School Uniforms', keywords: ['school', 'uniform', 'uniforms', 'student'] },
        { src: 'SCHOOL-UNIFORMS 2.jpg', alt: 'School Uniform', title: 'School Uniforms', keywords: ['school', 'uniform'] },
        { src: 'SCHOOL-UNIFORMS 3.jpg', alt: 'Student Uniform', title: 'School Uniforms', keywords: ['student', 'uniform'] },
        { src: 'SCHOOL-UNIFORMS 4.jpg', alt: 'School Wear', title: 'School Uniforms', keywords: ['school', 'wear'] },
        { src: 'SCHOOL-UNIFORMS 5.jpg', alt: 'School Uniform', title: 'School Uniforms', keywords: ['school', 'uniform'] },
        
        // Summer
        { src: 'SUMMER-1.jpg', alt: 'Summer Wear', title: 'Summer Collection', keywords: ['summer', 'beach', 'casual', 'hot weather'] },
        
        // Mixed
        { src: 'WOMEN-AND-MEN\'S WEAR.jpg', alt: 'Mens and Womens Wear', title: 'Mixed Collection', keywords: ['women', 'men', 'wear', 'fashion'] },
        { src: 'WOMEN-AND-MEN\'S  WEAR.jpg', alt: 'Womens and Mens Wear', title: 'Mixed Collection', keywords: ['women', 'men', 'wear'] },
        
        // Equipment
        { src: 'machine.jpg', alt: 'Sewing Machine', title: 'Equipment', keywords: ['machine', 'sewing', 'equipment', 'fabric', 'tailoring'] },
        
        // Services
        { src: 'services-2.png', alt: 'Services', title: 'Services', keywords: ['services', 'tailoring', 'design'] }
    ];

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function normalizeValue(value) {
        return String(value || '').trim().toLowerCase();
    }

    function findImageResults(searchTerm) {
        const normalized = normalizeValue(searchTerm);
        if (!normalized) {
            return [];
        }

        const exactMatches = [];
        const partialMatches = [];

        imageCatalog.forEach((image) => {
            const searchableText = [image.src, image.alt, image.title, (image.keywords || []).join(' ')].join(' ').toLowerCase();
            const exactPattern = new RegExp(`\\b${escapeRegExp(normalized)}\\b`, 'i');

            if (exactPattern.test(searchableText)) {
                exactMatches.push(image);
            } else if (searchableText.includes(normalized)) {
                partialMatches.push(image);
            }
        });

        return exactMatches.concat(partialMatches);
    }

    function clearSearchResults() {
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'none';
    }

    function performSearch() {
        const searchTerm = normalizeValue(searchInput.value);

        if (!searchTerm) {
            clearSearchResults();
            clearHighlights();
            return;
        }

        const imageResults = findImageResults(searchTerm);
        displayImageResults(imageResults, searchTerm);
        highlightMatches(searchTerm);
    }

    function displayImageResults(results, searchTerm) {
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            searchResultsContainer.innerHTML = `<div class="no-results">No exact image found for "${searchTerm}"</div>`;
        } else {
            let html = `<div class="search-results-header">Showing ${results.length} image result${results.length !== 1 ? 's' : ''} for "${searchTerm}"</div>`;
            html += '<div class="search-results-grid">';

            results.forEach((image, index) => {
                html += `
                    <div class="search-result-card" data-image-index="${index}" data-image-src="${image.src}" data-image-alt="${image.alt}">
                        <img class="search-result-image" src="${image.src}" alt="${image.alt}">
                        <div class="search-result-text">
                            <div class="result-title">${image.title}</div>
                            <div class="result-alt">${image.alt}</div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            searchResultsContainer.innerHTML = html;

            // Add click handlers for image maximization
            const resultCards = searchResultsContainer.querySelectorAll('.search-result-card');
            resultCards.forEach((card) => {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    const imageSrc = this.getAttribute('data-image-src');
                    const imageAlt = this.getAttribute('data-image-alt');
                    showMaximizedImage(imageSrc, imageAlt);
                });
            });
        }

        searchResultsContainer.style.display = 'block';
    }

    function showMaximizedImage(src, alt, categoryName = '') {
        let modal = document.getElementById('image-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'image-modal';
            modal.className = 'image-modal';
            document.body.appendChild(modal);
        }

        const orderLabel = categoryName ? `🛍️ Order ${categoryName}` : '🛍️ Order';
        const modalContent = `
            <div class="image-modal-content">
                <span class="close-modal">&times;</span>
                <img class="maximized-image" src="${src}" alt="${alt}">
                <button class="action-btn modal-order-btn" type="button">${orderLabel}</button>
            </div>
        `;
        modal.innerHTML = modalContent;
        modal.classList.add('active');

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        const orderBtn = modal.querySelector('.modal-order-btn');
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                window.location.href = 'Order form.html';
            });
        }
    }

    function highlightMatches(searchTerm) {
        clearHighlights();

        if (!searchTerm) {
            return;
        }

        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToReplace = [];
        let node;

        while ((node = walker.nextNode())) {
            if (regex.test(node.nodeValue)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach((textNode) => {
            const span = document.createElement('span');
            span.innerHTML = textNode.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
            textNode.parentNode.replaceChild(span, textNode);
        });
    }

    function clearHighlights() {
        const highlights = document.querySelectorAll('mark.highlight');
        highlights.forEach((mark) => {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
            parent.normalize();
        });
    }

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            clearSearchResults();
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

    function getCategoryImages(categoryKey) {
        const categoryTerms = {
            'mens-wear': ['mens wear', 'men', 'gents', 'suit', 'shirt'],
            'womens-wear': ['womens wear', 'women', 'female', 'dress', 'gown'],
            'bridal': ['bridal', 'wedding', 'bride', 'gown'],
            'interiors': ['machine', 'sewing', 'fabric', 'tailoring', 'curtain', 'cushion', 'interior'],
            'school-uniforms': ['school uniform', 'school', 'uniform', 'student'],
            'mixed-wear': ['mixed', 'women', 'men', 'wear', 'fashion', 'collection']
        };
        const terms = categoryTerms[categoryKey] || [categoryKey];

        return imageCatalog.filter((image) => {
            const searchableText = [image.src, image.alt, image.title, ...(image.keywords || [])].join(' ').toLowerCase();
            return terms.some((term) => searchableText.includes(term));
        });
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

    });

    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach((btn) => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const orderSrc = btn.dataset.orderSrc || '';
            const serviceName = btn.dataset.serviceName || '';
            const params = new URLSearchParams();
            if (orderSrc) params.set('image', orderSrc);
            if (serviceName) params.set('service', serviceName);
            const target = 'Order form.html' + (params.toString() ? `?${params.toString()}` : '');
            window.location.href = target;
        });
    });

    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.category-card');
            if (!card) return;
            const moreArea = card.querySelector('.more-images');
            const categoryKey = card.id;
            const categoryImages = getCategoryImages(categoryKey);
            const isOpen = !moreArea.classList.contains('hidden');

            if (isOpen) {
                moreArea.classList.add('hidden');
                btn.textContent = '📸 More';
                return;
            }

            if (categoryImages.length === 0) {
                moreArea.innerHTML = `<div class="no-more-images">No additional images available for this category.</div>`;
            } else {
                moreArea.innerHTML = `<div class="more-images-grid">${categoryImages.slice(0, 6).map((image) => `
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                `).join('')}</div>`;
            }

            moreArea.classList.remove('hidden');
            btn.textContent = 'Hide';
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });

            const gridImages = moreArea.querySelectorAll('.more-images-grid img');
            const categoryName = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
            gridImages.forEach((image) => {
                image.style.cursor = 'zoom-in';
                image.addEventListener('click', function() {
                    showMaximizedImage(this.src, this.alt, categoryName);
                });
            });
        });
    });
});
