console.log("Hello World")

KaliController.init()


const feelingsForm = document.getElementById('feelings-form')
const nameInputEl = document.getElementById('name-input')
const titleInputEl = document.getElementById('title-input')
const feelingInput = document.getElementById('feeling-input')
const mediatInput = document.getElementById('media-input')


feelingsForm.addEventListener('click', (e) => {
    event.preventDefault()

    console.log("Form Active")

    const feelingsObject = {
        name: nameInputEl.value, 
        title: titleInputEl.value,
        feelings: feelingInput.value,
        media_element: mediatInput.value
    }

    KaliController.addPost(feelingsObject)
    API.createPost(feelingsObject)

})











