function toggleAuthOverlay(event) {
    const overlay = document.getElementById('auth-overlay-popup');

    if(!overlay) {
        const header = document.querySelector('header');
        const popup = document.createElement('aside');

        popup.setAttribute('id', 'auth-overlay-popup');
        document.body.addEventListener('click', toggleAuthOverlay, true);
        popup.innerHTML = '<a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=17e6997fb89710dce3dd"><img src="assets/images/gitAuth.png" /></a>';

        header.after(popup);
    } else if(event.target !== overlay) {
        document.body.removeChild(overlay);
        document.body.removeEventListener('click', toggleAuthOverlay, true);
    }
}
