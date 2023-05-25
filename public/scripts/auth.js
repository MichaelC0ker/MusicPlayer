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
    console.log(searchParams.code);
    const requestToken = searchParams.code;

    let url = 'https://github.com/login/oauth/access_token';

    url += `?client_id=${config.auth.client_id}`;
    url += `&client_secret=${config.auth.client_secret}`;
    url += `&code=${requestToken}`;

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        }
    };

    const fetchResponse = await fetch(url, options);
    const data = await fetchResponse.json();
    const accessToken = data.access_token;

    if (!accessToken) {
        return {
            ok: false,
            data: {
                error: data.error ?? 'Failed to get access token',
                reason: data.error_description ?? 'No description available'
            },
            status: 500
        };
    }

    const userDataResponse = await fetch('http://ec2-52-212-165-138.eu-west-1.compute.amazonaws.com:5000/auth/user',
        {headers: {token: accessToken}});
    const data = await fetchResponse.json();

    if(!data) {
        console.log("error");
    }

    window.alert(data.data.email);
};

getAccessToken();

