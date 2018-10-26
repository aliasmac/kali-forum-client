console.log("Hello World")

KaliController.init()


// HOMEPAGE FORMATTING SECTION

document.addEventListener('click', (e) => {

    const forms = document.getElementById('forms-div')
    const posts = document.getElementById('posts-div')
    const search = document.getElementById('search-area-main')
    const signUpForm = document.getElementById('new-user-form')
    const feelingzzForm = document.getElementById('feelings-form')
    // const accordianMain = document.getElementById('accordian-main')


    if (e.target.id === "search") {
        forms.style.display = 'none'
        posts.style.display = 'none'
        search.style.display = 'block'

    }

    if (e.target.id === "forum") {
        forms.style.display = 'block'
        posts.style.display = 'block'
        search.style.display = 'none'
        
    }

    // if (e.target.id === "see-heading") {
    //     forms.style.display = 'none'
    //     search.style.display = 'none'
    //     posts.style.display = 'block'

    // }


    if (e.target.id === "sign-up") {
        signUpForm.classList.toggle("visible") 
        
    }

    if (e.target.id === "share") {
        feelingzzForm.classList.toggle("visible")
    
    }
 
    
    
})

// Smiley link to search 
    const forms1 = document.getElementById('forms-div')
    const posts1 = document.getElementById('posts-div')
    const search1 = document.getElementById('search-area-main')
    const smiley = document.getElementById('gif-search-side')

    smiley.addEventListener('click', (e) => {
        if (search1.style.display === "none") {
            forms1.style.display = 'none'
            posts1.style.display = 'none'
            search1.style.display = 'block'
        } else {
            forms1.style.display = 'block'
            posts1.style.display = 'block'
            search1.style.display = 'none'
        }
        
    })


// FORM FUNCTIONALITY 

const feelingsForm = document.getElementById('feelings-form')
const nameInputEl = document.getElementById('name-input')
const titleInputEl = document.getElementById('title-input')
const feelingInput = document.getElementById('feeling-input')
const mediaInput = document.getElementById('media-input')
let newUserId 


const userSelect = document.getElementById('feeling-name-select')

const newUserForm = document.getElementById('new-user-form')
const newUserInput = document.getElementById('new-user-name')


newUserForm.addEventListener('submit', (e) => {
    event.preventDefault()
    console.log("User form active")

    const user = {
        name: newUserInput.value
    }

    API.createUser(user)
        .then(function(resp) {
                KaliController.addUser(resp)

                const userSelect = document.getElementById('feeling-name-select')
                let userEl = document.createElement('option')
                userEl.value = resp.id
                userEl.innerText = resp.name   
                userSelect.append(userEl)



            }
        )
})


feelingsForm.addEventListener('submit', (e) => {
    event.preventDefault()

    console.log("Feelings form Active")

    const feelingsObject = {
        author_id: userSelect.value,
        title: titleInputEl.value,
        content: feelingInput.value,
        media_element: mediaInput.value,
        score: 0
    } 

    // console.log(feelingsObject)
    API.createPost(feelingsObject)
        .then(resp => {      
            KaliController.addPost(resp)
            renderLightbox()
        })

})



// Search Functionality 

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#user-input')
const gifsFound = document.querySelector('.gifs')
const gifOutput = document.querySelector('#gifs-here')
const apiKey = 'rqeTran7daTGoUbORg2UpW6k6Qps2tsK'


let output = '';
// gifsFound.innerHTML = 'Search for a gif!';

searchForm.addEventListener('keyup', function(e) {
    e.preventDefault();
    gifsFound.style.display = 'block';
    let userQuery = searchInput.value;
    output = '';

    //Get gifs from Giphy API using user input
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userQuery}&limit=20`)
        .then(resp => resp.json())
        .then(data => {
            const gifs = data.data;
            console.log(data)
            console.log(gifs)

            //Check if any gifs were returned
            if (gifs.length > 0) {
                gifs.forEach(gif =>
                    output +=
                    `<div class="gif-result" >
                        <span> <a href="${gif.images.original.url}" target="_blank"><img src="${gif.images.fixed_height_small.url}" class="gif"></a></span>
                        <div>
                            <input type="text" value="${gif.images.fixed_width.url}" id="img-url">
                        </div>
                    </div>`
                    );
                    gifOutput.innerHTML = output;
                    
            } else {
                gifsFound.innerHTML = '<p>😔 No GIFs Found, please try another search term! 😔</p>';

            }
        })
        .catch(err => {
            gifOutput.innerHTML = `<p>😔 Error: ${err.message} 😔</p>`;

        });
   
        console.log(gifOutput)
})

{/* <button onclick="copyUrl()">Copy URL</button> */}

// const copyUrl = () => {
//         var copyText = document.getElementById("img-url");
//         copyText.select();
//         document.execCommand("copy");
//         alert("Copied image URL to your clipboard!");
//       }

    
const renderLightbox = () => { const instance = basicLightbox.create(`
      <img src="https://media.giphy.com/media/l0K4m0mzkJDAIdhHW/giphy.gif">
  `)
  instance.show()
    }





