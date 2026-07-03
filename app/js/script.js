document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inizializzazione AOS (rispetta prefers-reduced-motion)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery.matches && typeof AOS !== 'undefined') {
        AOS.init({ duration: 700, once: true });
    }

    // 2. Gestione Dialog Privacy
    const dialog = document.getElementById('privacyDialog');
    const openPrivacy = document.getElementById('openPrivacy');
    const closePrivacy = document.getElementById('closePrivacy');
    const closePrivacyBtn = document.getElementById('closePrivacyBtn');

    if (openPrivacy && dialog) {
        openPrivacy.addEventListener('click', (e) => {
            e.preventDefault(); // Correzione: impedisce il salto della pagina all'insù
            dialog.showModal();
        });
    }

    if (dialog) {
        if (closePrivacy) closePrivacy.addEventListener('click', () => dialog.close());
        if (closePrivacyBtn) closePrivacyBtn.addEventListener('click', () => dialog.close());
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });
    }

    // 3. Gestione Chiusura Navbar Mobile
    const toggler = document.querySelector('.navbar-toggler');
    const collapseEl = document.querySelector('.navbar-collapse');
    
    if (toggler && collapseEl) {
        // Correzione: Recupera o crea una sola istanza riutilizzabile anziché duplicarla
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (getComputedStyle(toggler).display !== 'none') {
                    bsCollapse.hide(); // Usa .hide() per la chiusura anziché .toggle()
                }
            });
        });
    }
});