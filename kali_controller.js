class KaliController {

    static init() {
        API.getPosts()
            .then(post => this.addPosts(post))

        API.getUsers()
            .then(user => this.addUsers(user))
            .then(() => KaliController.usersToSelect())    
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

            if (elComment.style.display === 'block') {

                const commentForm = document.getElementById(`leave-comment-form-${post.id}`)
                const userSelect = document.getElementById(`leave-comment-select-${post.id}`)
                userSelect.innerHTML = ""

                KaliController.users.forEach(function(user) { 
                    let userEl = document.createElement('option')
                    userEl.value = user.id
                    userEl.innerText = user.name   
                    userSelect.append(userEl)
                })

                const commentInput = document.getElementById(`title-input-${post.id}`)

                commentForm.addEventListener('submit', (e) => {
                    event.preventDefault()

                    // const commentForm = document.getElementById(`leave-comment-form-${post.id}`)

                    const comment = {
                        post_id: post.id,
                        user_id: userSelect.value,
                        content: commentInput.value
                    }
 
                    API.addComment(comment)
                        .then(function(resp) {
                            const allComments = document.getElementById(`comment-container-${post.id}`)
                            const commentor = User.findById(parseInt(comment.user_id)) 
                            const newComment = document.createElement('p')
                            newComment.innerHTML = `<strong>${commentor.name}</strong> - ${resp.content}`
                            allComments.append(newComment)
                        })

                })   

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

            const titleInput = document.getElementById(`edit-title-input-${post.id}`)
            const feelingInput = document.getElementById(`feeling-input-${post.id}`)
            const mediaInput = document.getElementById(`media-input-${post.id}`)


            editFormEl.addEventListener('submit', (e) => {
                event.preventDefault()

                const updatedFeelings = {
                    id: post.id,
                    title: `${ titleInput.value ? titleInput.value : titleInput.placeholder }`,
                    content: `${feelingInput.value ? feelingInput.value : feelingInput.placeholder}`  ,
                    media_element: `${mediaInput.value ? mediaInput.value : mediaInput.placeholder}`,
                    author_id: post.author_id,
                }


                console.log(updatedFeelings)

                API.editPost(post.id, updatedFeelings)
                    .then(function(resp) {

                        const titleEl = document.querySelector(`#post-id-${resp.id} h3`)
                        titleEl.innerText = ""
                        titleEl.innerText = `Feeling ${resp.title}`

                        // Lowdown
                        const lowdownEl = document.querySelector(`#post-id-${resp.id} #lowdown-${resp.id}`)
                        lowdownEl.innerText = ""
                        lowdownEl.innerText = `The Lowdown: ${resp.content}`

                        const gifEl = document.querySelector(`#post-id-${resp.id} img`)
                        gifEl.src = ""
                        gifEl.src = resp.media_element

                    }) 


            })
      
        })

        // Upvote Downvote Funtionality 

        // Add score attribute to the post 
        // select the socre buttons 
        // add event listeners to them 
        // change the score 
        // persist to database 
        

        
        const upvoteBtn = document.getElementById(`upvote-${post.id}`)
        const downvoteBtn = document.getElementById(`downvote-${post.id}`)
        let count = parseInt(document.getElementById(`score-${post.id}`).innerText)

        upvoteBtn.addEventListener('click', (e) => {
            count = count + 1
            document.getElementById(`score-${post.id}`).innerText = count 
            API.editPost(post.id, {score: count})
            
        })
        
        downvoteBtn.addEventListener('click', (e) => {
            count = count - 1
            document.getElementById(`score-${post.id}`).innerText = count 
            API.editPost(post.id, {score: count})

        })

        // End on Long ass render method
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

    static usersToSelect() {
        this.users.forEach(function(user) {
            const userSelect = document.getElementById('feeling-name-select')
            let userEl = document.createElement('option')
            userEl.value = user.id
            // charEl.className = `${char.name}-${char.id}`
            userEl.innerText = user.name   
            return userSelect.append(userEl)
        })
    }

    static userToCommentSelect() {
        KaliController.users.forEach(function(user) {
            const userSelect = document.getElementById('leave-comment-select')
            let userEl = document.createElement('option')
            userEl.value = user.id
            // charEl.className = `${char.name}-${char.id}`
            userEl.innerText = user.name   
            userSelect.append(userEl)
        })
    }


     
}

KaliController.posts = []
KaliController.users = []
KaliController.postMain = document.getElementById('accordion-main')

