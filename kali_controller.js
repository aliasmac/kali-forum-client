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
        let postElement = post.renderPost()
        this.postMain.append(postElement)

        const elComment = document.getElementById(`accordion-${post.id}`)
        elComment.style.display = 'none'

        postElement.addEventListener('click', (e) => {
            console.log("Working")
            
            if (elComment.style.display === 'none') {
                elComment.style.display = 'block'
            } else if (elComment.style.display === 'block') {
                elComment.style.display = 'none'
            }

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