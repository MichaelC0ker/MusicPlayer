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

const getAccessToken = async () => {
    const currentURL = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentURL);
    console.log(window.location.search ?? 'no window.location.search value');

    let url = 'https://34.244.5.94.nip.io:5000/auth/user';

    url += window.location.search;

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };

    const fetchResponse = await fetch(url, options);
    const data = await fetchResponse.json();

    if(!data) {
        console.log("error");
    }

    console.log(getUserId(data.headers.token));
};

const getUserId = async (accessToken) => {
    let url = 'https://34.244.5.94.nip.io:5000/auth/user';

    url += window.location.search;

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            token: atob(accessToken)
        }
    };

    const fetchResponse = await fetch(url, options);
    const data = await fetchResponse.json();
    console.log(data)
};

const addUser = async() => {
    const username = document.getElementById('auth-user');

    const url = 'https://34.244.5.94.nip.io:5000/auth/user';

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            user: username
        }
    };

    const fetchResponse = await fetch(url, options);
    const data = await fetchResponse.json();

    if(data.ok) {
        sessionStorage.setItem('username', username);
    } else {
        
    }
};


// getAccessToken();

