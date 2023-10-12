const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
let puppiesInfo;
let puppyCurrentlyDisplayed;
let goodDogsList



fetch('http://localhost:3000/pups')
.then(response => response.json())
.then( puppies =>{
    puppiesInfo=puppies;
    puppiesInfo.forEach(puppy=>{
        addPuppyNametoThelist(puppy)
    })
})

function addPuppyNametoThelist(puppy){
    const span = document.createElement('span')
    span.textContent=puppy.name
    dogBar.appendChild(span)
    span.addEventListener('click', ()=>{
        addDogInfo(puppy)
    })
}

function addDogInfo(puppy){
    puppyCurrentlyDisplayed=puppy
    dogInfo.innerHTML=''
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const button = document.createElement('button')
    img.src=puppy.image;
    h2.textContent=puppy.name;
    button.textContent = puppy.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
    button.addEventListener('click', ()=>{
        if (button.textContent==='Good Dog!'){
            button.textContent='Bad Dog!'
            puppy.isGoodDog=false
        } else {
            button.textContent='Good Dog!'
            puppy.isGoodDog=true
        }
    })
}

goodDogFilter.addEventListener('click', () =>{
    if (goodDogFilter.textContent==='Filter good dogs: OFF'){
        goodDogsList = puppiesInfo.filter((dog)=> dog.isGoodDog===true)
        dogBar.innerHTML=''
        goodDogsList.forEach(goodDog => {
            addPuppyNametoThelist(goodDog)
        })
        console.log(puppiesInfo)
        goodDogFilter.textContent='Filter good dogs: ON'
    } else if (goodDogFilter.textContent==='Filter good dogs: ON'){
        dogBar.innerHTML=''
        puppiesInfo.forEach(puppy=>{
            addPuppyNametoThelist(puppy)
        })
        goodDogFilter.textContent==='Filter good dogs: OFF'
    }
})

