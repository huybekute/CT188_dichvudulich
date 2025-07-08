// Nguyen Van Hoang Huy - B2308362
// tao hieu ung khi cuon toi trang chu
const allSections = document.querySelectorAll(".home__div--hidden, .home__img--hidden, .home__section--hidden");
const revealSection = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove("home__div--hidden");
    entry.target.classList.remove("home__img--hidden");
    entry.target.classList.remove("home__section--hidden");
    observer.unobserve(entry.target );
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0
});

allSections.forEach(function(section){
    sectionObserver.observe(section);
});