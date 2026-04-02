document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('seal-selector-form');
    const industrySelect = document.getElementById('industry');
    const pumpSelect = document.getElementById('pump');
    const resultsContainer = document.getElementById('results-container');
    const resultsGrid = document.getElementById('results-grid');
    const matchCount = document.getElementById('match-count');
    const noMatchesSpan = document.getElementById('no-matches');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const industry = industrySelect.value;
        const pump = pumpSelect.value;

        //reset the ui
        resultsGrid.innerHTML = '';
        resultsContainer.classList.remove('d-none');
        noMatchesSpan.classList.add('d-none');
        resultsGrid.classList.remove("d-none");

        //logic check: Validate availability of rule mapping
        if (typeof RECOMMENDATION_MAPPING === 'undefined' || typeof CATALOG_DATA === 'undefined') {
            console.console.error('Selector error: data files not loaded.');
            return;
        }
        const rules = RECOMMENDATION_MAPPING[industry]?.[pump];

        if (!rules) {
            matchCount.textContent = '0 matches';
            noMatchesSpan.classList.remove('d-none');
            resultsGrid.classList.add("d-none");
            return;
        }
        const { categories, keywords } = rules;
        const recommendedProducts = [];
        //loop through catalog categories specified in rules
        categories.forEach(catKey => {
            const categoryData = CATALOG_DATA[catKey];
            if (categoryData) {
                //find matching images within this category based on keywords
                const matchingImages = categoryData.images.filter(img =>
                    keywords.some(keyword => img.includes(keyword))
                );

                matchingImages.forEach(img => {
                    recommendedProducts.push({
                        categoryTitle: categoryData.title,
                        imagePath: `${categoryData.path}${img}`,
                        imageName: img
                    });

                });
            }
        });
        //update match count badge
        matchCount.textContent = `${recommendedProducts.length} match${recommendedProducts.length === 1 ? '' : 'es'}`;

        if (recommendedProducts.length === 0) {
            noMatchesSpan.classList.remove('d-none');
            resultsGrid.classList.add("d-none");
        } else {
            //Render result cards
            recommendedProducts.forEach((product, index) => {
                //formatted display name
                let displayName = product.imageName.replace('.jpg', '');
                const prefixes = ['single-spring-seal-', 'bellows-seal-', 'multi-spring-seal-', 'specialty-seal-'];
                prefixes.forEach(prefix => {
                    if (displayName.startsWith(prefix)) {
                        displayName = displayName.replace(prefix, '');
                    }
                });

                displayName = displayName
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 mb-4';

                col.innerHTML = `
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <div class="ratio ratio-1x1 bg-dark">
                            <img src="${product.imagePath}" alt="${displayName}" class="card-img-top p-4 object-fit-contain">
                        </div>
                        <div class="card-body p-3 text-center d-flex flex-column">
                            <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill mb-2 align-self-center px-3" style="font-size: 0.7rem;">
                                ${product.categoryTitle}
                            </span>
                            <h6 class="card-title fw-bold mb-3">${displayName}</h6>
                            <div class="mt-auto">
                                <a href="${product.imagePath}" target="_blank" class="btn btn-primary btn-sm rounded-pill w-100">
                                    View Product
                                </a>
                            </div>
                            <p class="small text-muted mt-2 mb-0">Match for ${industry} ${pump}</p>
                        </div>
                    </div>
                `;
                resultsGrid.appendChild(col);
            })
        }

        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    });
});