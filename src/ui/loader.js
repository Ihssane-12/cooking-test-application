let loaderTimer;

export const toggleLoader = (show, retryCallback = null) => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    clearTimeout(loaderTimer); 

    if (show) {
        loader.classList.remove('hidden');
        loader.innerHTML = `
            <div class="loader-container">
                <div class="spinner"></div>
                <p id="loader-text">Loading recipes...</p>
                <div id="retry-container" class="hidden">
                    <button id="btn-retry" class="tab-btn active">Retry Now</button>
                </div>
            </div>
        `;

        loaderTimer = setTimeout(() => {
            const retryCont = document.getElementById('retry-container');
            const loaderText = document.getElementById('loader-text');
            if (retryCont) {
                retryCont.classList.remove('hidden');
                loaderText.innerText = "It's taking longer than usual...";
            }
        }, 8000);

        setTimeout(() => {
            const btn = document.getElementById('btn-retry');
            if (btn && retryCallback) {
                btn.onclick = () => {
                    toggleLoader(true, retryCallback);
                    retryCallback();
                };
            }
        }, 100);

    } else {
        loader.classList.add('hidden');
        loader.innerHTML = '';
    }
};