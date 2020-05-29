let users = [];
let countries = [];
let usersAndCountries = [];

async function start(){
    console.log('Dom carregado');

    await fetchUsers();
    await fetchCountries();
    hideSpinner();
    mergeUsersAndCountries();
    render();
}

async function fetchUsers(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    users = json.results.map(({ name, picture, nat }) =>{
        return {
            Username: name.first,
            Userpicture: picture.large,
            Usercountry: nat
        }
    });
    

}

function fetchCountries(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    countries = json.map((countries) =>{
        return {
            countryNme: name.first,
            countryCode: picture.large,
            countryFlag: nat,
        }
    });
}

function hideSpinner(){}
function mergeUsersAndCountries(){}
function render(){}

start();