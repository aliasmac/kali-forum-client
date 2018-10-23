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

            // const editFormEl = document.getElementById(`edit-form-${this.id}`)
            // const editInput = document.getElementById(`edit-input-${this.id}`)

      
        })
        
        

        // editFormEl.addEventListener('submit', (e) => {
            
        //     event.preventDefault()

        //     const updatedFeelings = editInput.value 



        // })
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