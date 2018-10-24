class KaliController {

    static init() {
        API.getPosts()
            .then(post => this.addPosts(post))

        API.getUsers()
            .then(user => this.addUsers(user))    
    }

    // Posts 
    static addPosts(posts) {
        posts.forEach(post => this.addPost(post))
    }

    static addPost(post) {
       
        const newPost = new Post(post)
        this.posts.push(newPost)
        this.renderPost(newPost)
    }

    static renderPost(post) {
        console.log("Render Post Method")
  
        let postElement = post.renderPost()
        this.postMain.append(postElement)

        // Comment section

        const elComment = document.getElementById(`accordion-${post.id}`)
        elComment.style.display = 'none'

        const commentBtn = document.getElementById(`comment-btn-${post.id}`)
        

        commentBtn.addEventListener('click', (e) => {
            console.log("Working")
            
            if (elComment.style.display === 'none') {
                elComment.style.display = 'block'
            } else if (elComment.style.display === 'block') {
                elComment.style.display = 'none'
            }

        })

        // edit section

        const editBtn = document.getElementById(`edit-btn-${post.id}`)
        const elEdit = document.getElementById(`edit-${post.id}`)
        elEdit.style.display = 'none'

        editBtn.addEventListener('click', (e) => {

            if (elEdit.style.display === 'none') {
                elEdit.style.display = 'block'
            } else if (elEdit.style.display === 'block') {
                elEdit.style.display = 'none'
            }

            // Edit Patch request
            
            // Get form & input
            const editFormEl = document.getElementById(`edit-form-${post.id}`)

            const titleInput = document.getElementById(`title-input-${post.id}`)
            const feelingInput = document.getElementById(`feeling-input-${post.id}`)
            const mediaInput = document.getElementById(`media-input-${post.id}`)


            editFormEl.addEventListener('submit', (e) => {
                event.preventDefault()
                console.log("Hello")

                const updatedFeelings = {
                    id: post.id,
                    title: titleInput.value,
                    content: feelingInput.value,
                    media_element: mediaInput.value,
                    author_id: post.author_id,
                }

                API.editPost(post.id, updatedFeelings)
                    .then(resp => console.log(resp)) 




            })
      
        })
        
        
    }


    // Users 
    static addUsers(users) {
        users.forEach(user => this.addUser(user))
    }

    static addUser(user) {
        const newUser = new User(user)
        this.users.push(newUser)
        // KaliController.renderUser(newUser)
    }


     
}

KaliController.posts = []
KaliController.users = []
KaliController.postMain = document.getElementById('accordion-main')