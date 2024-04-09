let navbarLinks = document.querySelectorAll('.to-activate');
function setActivePage() {
    // Get the ID of the current page
    const currentPageId = document.body.id;

    // Loop through navbar links and add 'active' class to the corresponding link
    for (let i = 0; i < navbarLinks.length; i++) {
        if (currentPageId === navbarLinks[i].id) {
            navbarLinks[i].classList.add('active');
            break; // Exit the loop once the active link is found
        }
    }
}
setActivePage();


