console.log("Hello World")

KaliController.init()


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
        feelings: feelingInput.value,
        media_element: mediaInput.value
    } 

    // console.log(feelingsObject)
    API.createPost(feelingsObject)
        .then(resp => {      
            KaliController.addPost(resp)
        })

})

// Search Functionality 

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#user-input')
const gifsFound = document.querySelector('.gifs')
const gifOutput = document.querySelector('#gifs-here')
const apiKey = 'rqeTran7daTGoUbORg2UpW6k6Qps2tsK'


let output = '';
gifsFound.innerHTML = 'Search for a gif!';

searchForm.addEventListener('keyup', function(e) {
    e.preventDefault();
    gifsFound.style.display = 'block';
    let userQuery = searchInput.value;
    output = '';

    //Get gifs from Giphy API using user input
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userQuery}&limit=10`)
        .then(resp => resp.json())
        .then(data => {
            const gifs = data.data;
            console.log(data)
            console.log(gifs)

            //Check if any gifs were returned
            if (gifs.length > 0) {
                gifs.forEach(gif =>
                    output +=
                    `<tr class="gif-result">
                    <span>
                        <a href="${gif.images.original.url}" target="_blank">
                            <img src="${gif.images.fixed_width_downsampled.url}" class="gif">
                        </a>
                        <div>
                        <input type="text" value="${gif.images.original.url}" id="img-url">
                        <button onclick="copyUrl()">Copy URL</button>
                        <div>
                        </span>
                        </tr>`);
                gifsFound.innerHTML = output;
            } else {
                gifsFound.innerHTML = '<p>😔 No GIFs Found, please try another search term! 😔</p>';

            }
        })
        .catch(err => {
            gifOutput.innerHTML = `<p>😔 Error: ${err.message} 😔</p>`;

        });

})



const copyUrl = () => {
        var copyText = document.getElementById("img-url");
        copyText.select();
        document.execCommand("copy");
        alert("Copied image URL to your clipboard!");
      }
    









