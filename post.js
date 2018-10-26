class Post {

    constructor(postData) {
        this.id = postData.id
        this.title = postData.title
        this.content = postData.content
        this.media_element = postData.media_element
        this.author_id = postData.author_id
        this.comments = postData.comments
        this.score = postData.score
        this.created_at = postData.created_at
        this.updated_at = postData.updated_at
    }

    renderAllComments () {

        // let comments = [] 
        // let allComments = []
        // this.comments.forEach(c => comments.push(c))
        let commentsAp = '';

        for (const el of this.comments) {
            const commentor = User.findById(parseInt(el.user_id))   
            commentsAp += `
            <div class="delete-comment" id="comment-div-${el.id}">
            <p><strong>${commentor.name}</strong> - ${el.content}</p>
            <i class="fas fa-trash-alt" id="delete-${el.id}"></i>
            </div>
            `
            
            // const deleteBtn = document.getElementById(`delete-${this.id}`)
            
        }   

        return commentsAp

    }

    renderPost () {
        
        const postAuthor = User.findById(this.author_id)
        
        const time = this.created_at.split("T")[1].split(".")[0]
        const date = this.created_at.split("T")[0]

        const postEl = document.createElement('div')
        postEl.className = 'post-panel'
        postEl.innerHTML = `
            <div id="post-id-${this.id}">

            <div class="visible-section">

                <div class="visible-main">
                    <div class="score">
                        <span class="hvr-icon-bob" id=upvote-${this.id}><i class="fas fa-chevron-up hvr-icon upvote" class="hvr-icon-bob" style="color: black;"></i></span>
                        <p id="score-${this.id}">${this.score}<p>
                        <span class="hvr-icon-bob" id=downvote-${this.id}><i class="fas fa-chevron-down hvr-icon downvote" class="hvr-icon-bob" style="color: black;"></i></span>
                    </div>
                    
                    <div class="feelings-text">

                        <p class="posted-by">Posted by: ${postAuthor.name} at: ${time}, on ${date} </p> 

                        <div class="feelings-content">
                            <div class="random">
                                <h3>Feeling: ${this.title}</h3>
                                <p id="lowdown-${this.id}">${this.content}</p>
                            </div>
                            <div class="gif-div">
                                <img src="${this.media_element}" >
                            </div>
                        </div>

                        <div class="forum-icons">
                            <div>
                                <span id="comment-btn-${this.id}" class="comment-btn"><i class="far fa-comment-alt" style="color: purple"></i></span> 
                            </div>
                            <div class="forum-edit-icon">
                                <span id="edit-btn-${this.id}" class="edit-btn"><i class="far fa-edit" style="color: purple"></i></span>
                            </div>
                        </div>
                    </div>

                    
                </div>
                              
            </div>    
            
                <div class="accordion-content" id="accordion-${this.id}">
                    <div id=comment-container-${this.id}>${this.renderAllComments()}</div>
                    <div>
                        <form id="leave-comment-form-${this.id}">
                            <p class="join-convo">Join the conversation...</p>
                            <select id="leave-comment-select-${this.id}">
                            </select>
                            <input type="text" id="title-input-${this.id}" ></input> 
                            <input type="submit" value="Add comment">
                        </form>
                    </div>
                </div>

                <div class="edit-form" id="edit-${this.id}" >

                    <form id="edit-form-${this.id}">
                        <div>
                            <p>Title:</p> 
                            <input type="text" id="edit-title-input-${this.id}" placeholder="${this.title}"></input>
                        </div>
                        <div>
                            <p>Feeling:</p>
                            <input type="text" id="feeling-input-${this.id}" placeholder="${this.content}"></input>
                        </div>
                        <div>
                            <p>Gif:</p>     
                            <input type="text" id="media-input-${this.id}" placeholder="${this.media_element}"></input>  
                        </div>
                        <input class="edit-form-button" type="submit" value="Edit comment">
                    </form>

                </div>


            </div>   
        `
        return postEl
    }



}

{/* <button id="comment-btn-${this.id}" class="comment-btn">View comments!</button>
<button id="edit-btn-${this.id}" class="edit-btn">Edit your post</button> */}