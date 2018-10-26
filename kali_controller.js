class KaliController {

    static init() {
        API.getPosts()
            .then(post => this.addPosts(post))
            .then(function() {
                KaliController.upvoteEventListener()

                // DELETE FUNCTION FOR EXISITNG BUTTONS
                const allComms = document.querySelectorAll('.delete-comment')
                
                allComms.forEach(function(com) {
                    // console.log(com.querySelector('i'))
                    const deleteButton = com.querySelector('i')

                    deleteButton.addEventListener('click', (e) => {
                        com.remove()
                        API.deletePost(parseInt(com.getAttribute('id').split('-')[2]))
                    })
                })
        
            })

        API.getUsers()
            .then(user => this.addUsers(user))
            .then(() => KaliController.usersToSelect())    
    }

    // Posts 

    static upvoteEventListener() {
        // const postPanel = document.querySelector('.post-panel')
        console.log("EEEEEEEEEEEE")

        const upvote = document.querySelectorAll('.upvote')
        const downvote = document.querySelectorAll('.downvote')
        const progress = document.getElementById('progress')
        let height = 100
        const playSong = document.getElementById("myAudio")

        upvote.forEach(function(btn) {
            btn.addEventListener('click', (e) => {
                if (height <= 0) {
                    height = height
                    playSong.play()
                } else {
                    height -= 2
                    progress.style.height = height + '%'
                }  
            })
        }) 
        

        downvote.forEach(function(btn) {
            btn.addEventListener('click', (e) => {
                if (height >= 5) {
                    height = height
                } else {
                    height += 2
                    progress.style.height = height + '%'
                }  
            })
        }) 

    }

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
                            console.log(resp)

                            const allComments = document.getElementById(`comment-container-${post.id}`)
                            const commentor = User.findById(parseInt(comment.user_id)) 
                            const newComment = document.createElement('p')
                            newComment.innerHTML = `
                                <div class="delete-comment id="comment-div-${resp.id}">
                                <p><strong>${commentor.name}</strong> - ${resp.content}</p>
                                <i class="fas fa-trash-alt" id="delete-${resp.id}"></i>
                                </div>
                            `
                            
                            allComments.append(newComment)

                            // DELETE BUTTON

                            const deleteBtn = document.getElementById(`delete-${resp.id}`)

                            deleteBtn.addEventListener('click', (e) => {
                                deleteBtn.parentElement.remove()
                                API.deletePost(resp.id)
                            })
                        })

                }) 
                
                // DELETE BUTTON
                // const deleteBtn = document.getElementById(`delete-${this.id}`)
                // const commentDiv = document.getElementById(`comment-div-${this.id}`)

                // deleteBtn.addEventListener('click', (e) => {
                //     commentDiv.remove()
                //     API.deletePost(this.id)
                // })

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

        // // DELETE BUTTON
        // const deleteBtn = document.getElementById(`delete-${this.id}`)
        //     const commentDiv = document.getElementById(`comment-div-${this.id}`)

        //     deleteBtn.addEventListener('click', (e) => {
        //         commentDiv.remove()
        //         API.deletePost(this.id)
        //     })

        // Upvote Downvote Funtionality 

        
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


    // PROGRESS BAR FUNCTIONALITY 
    
      
      
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

