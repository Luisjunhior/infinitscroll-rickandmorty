const itemContainer = document.querySelector('#itemContainer');
const requestTarget = document.querySelector('#requestTarget');

const intersectionOptions = {
    threshold: 1
}

let apiUrl = "https://rickandmortyapi.com/api/character";
let loading = false;

const onIntersection = ([entry]) =>{
    if(apiUrl && !loading && entry.isIntersecting)
        makeRequest();
}

const makeRequest = () =>{
    loading = true;
    fetch(apiUrl)
        .then(respone => respone.json())
        .then(data =>{
            cleanUp(data.info.next);
            renderItems(data.results);
        })
}

const cleanUp = nextPage =>{
    loading = false;
    apiUrl = nextPage;
}

const renderItems = results =>{
    results.forEach(item => {
        itemContainer.appendChild(createItem(item))
    });
}

const createItem = item =>{
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = (
        `
        <div class="char-id">${item.id}</div>
        <div class="char-name">${item.name}</div>
        <img class="char-img" src="${item.image}">
        <div class="char-species">${item.species}</div>
        `
    )
    return newItem;
}
let observer = new IntersectionObserver(onIntersection, intersectionOptions);

observer.observe(requestTarget);

