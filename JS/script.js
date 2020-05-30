let globalUsers = [];
let globalCountries = [];
let globalUsersAndCountries = [];

async function start(){
    const p1 = promiseUsers();
    const p2 = promiseCountries();

    await Promise.all([p1, p2]);

    hideSpinner();
    mergeUsersAndCountries();
    render();
}

function promiseUsers(){
    return new Promise(async(resolve, reject) => {
        const users = await fetchUsers();
        setTimeout( () => {
            resolve(users);
        }, 5000);
    });
}


function promiseCountries(){
    return new Promise(async(resolve, reject) => {
        const countries = await fetchCountries();
        setTimeout( () => {
            resolve(countries);
        }, 6000);
    });
}

async function fetchUsers(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    globalUsers = json.results.map(({ name, picture, nat }) =>{
        return {
            userName: name.first,
            userPicture: picture.large,
            userCountry: nat
        }
    });
}

async function fetchCountries(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    globalCountries = json.map(({name, alpha2Code, flag}) =>{
        return {
            countryName: name,
            countryCode: alpha2Code,
            countryFlag: flag
        }
    });
    
}

function hideSpinner(){
    const spinner = document.querySelector('#spinner');
    spinner.classList.add('hide');
}

function mergeUsersAndCountries(){
    globalUsersAndCountries = [];

    globalUsers.forEach((user) => {
        const userCountry = globalCountries.find((country) => {
            return country.countryCode === user.userCountry;
        });

        globalUsersAndCountries.push({...user, ...userCountry});
    });

    console.log(globalUsersAndCountries);
}

function render(){
    const divUsers = document.querySelector('#divUsers');

    divUsers.innerHTML = `
        <div class='row'>
            ${globalUsersAndCountries.map(({userPicture, userName, countryFlag}) => {
                return `
                    <div class='col s6 m4 l3'>
                        <div class= 'flex-row bordered' >
                            <img class='avatar' src='${userPicture}' />
                            <div class='flex-column' >
                            <span>${userName}</span>
                            <img class='flag' src='${countryFlag}' />
                            </div>
                        </div>
                    </div>
                `;
            }).join(' ')}
        </div>
    `;
}

start();