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

    let url = api_endpoint + '/auth/user';

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
    let url = api_endpoint+'/auth/user';

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

    const url = api_endpoint+'/auth/user';

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
        window.location.href="index.html"
    } else {
        
    }
};

const processErrorResponse = (e) => {
    sessionStorage.removeItem('user');

    const main = document.getElementById('main-content');
    const loader = document.getElementById('animated-loader');
    const failureHeading = document.createElement('h1');
    const failureText = document.createElement('p');

    failureHeading.innerText = 'Failed to authenticate';
    failureText.innerText = e?.reason ?? 'Please try refreshing the page';

    main.removeChild(loader);
    main.appendChild(failureHeading);
    main.appendChild(failureText);
};

const processSuccessResponse = (response) => {
    if(!response.id) {
        processErrorResponse(response);
        return;
    }

    console.log(`Successfully logged in as ${response?.id}`);
    sessionStorage.setItem('user', response.id);

    const main = document.getElementById('main-content');
    const loader = document.getElementById('animated-loader');
    const successHeading = document.createElement('h1');
    const successText = document.createElement('p');

    successHeading.innerText = 'Successfully authenticated';
    successText.innerText = `Your login id is ${response.id}<br />You will be redirected automatically in 5 seconds`;

    main.removeChild(loader);
    main.appendChild(successHeading);
    main.appendChild(successText);

    setTimeout(() => window.location.href = 'new.html', 5000);
};

const checkUserAuthStatus = async () => {
    let queryParams = window.location.search;

    if(!queryParams) {
        const signInButton = document.createElement('a');
        signInButton.setAttribute('href',
            'https://github.com/login/oauth/authorize?scope=user:email&client_id=17e6997fb89710dce3dd');
        signInButton.innerHTML = '<img id="sign-in-image" src="assets/images/gitAuth.png" />';

        const main = document.getElementById('main-content');
        const loader = document.getElementById('animated-loader');

        main.removeChild(loader);
        main.appendChild(signInButton);
    } else {
        const requestCode = queryParams
            .substring(1)
            .split('&')
            .filter(param => param.startsWith('code'))[0]
            ?.split('=')[1];

        if(!requestCode) {
            console.log('bad url');
            return;
        }
        let url = api_endpoint+'/auth/magic';

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                code: requestCode
            }
        };

        const fetchResponse = await fetch(url, options);
        console.log(`fetch response: ${JSON.stringify(fetchResponse)}`);
        fetchResponse.json()
            .then(processSuccessResponse)
            .catch(processErrorResponse);
    }
};

