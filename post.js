class Post {

    constructor(postData) {
        this.id = postData.id
        this.title = postData.title
        this.content = postData.content
        this.media_element = postData.media_element
        this.author_id = postData.author_id
        this.comments = postData.comments
        this.score = postData.score
    }

    renderAllComments () {

        let comments = [] 
        let allComments = []
        this.comments.forEach(c => comments.push(c))
        
        for (const el of comments) {
            const commentor = User.findById(parseInt(el.user_id))   
            allComments.push(`<p><strong>${commentor.name}</strong> - ${el.content}</p>`) 
        }   

        return allComments

    }

    renderPost () {
        
        const postAuthor = User.findById(this.author_id)
        // https://media1.giphy.com/media/RgpuFRi3bzuGA/giphy.gif

        const postEl = document.createElement('div')
        postEl.className = 'post-panel'
        postEl.innerHTML = `
            <div id="post-id-${this.id}">

            <div>
                <span class="hvr-icon-bob" id=upvote-${this.id}><i class="fas fa-chevron-up hvr-icon" class="hvr-icon-bob" style="color: black;"></i></span>
                <p id="score-${this.id}">${this.score}<p>
                <span class="hvr-icon-bob" id=downvote-${this.id}><i class="fas fa-chevron-down hvr-icon" class="hvr-icon-bob" style="color: black;"></i></span>
            </div>    

                <h3>Feeling: ${this.title}</h3>
                <p id="lowdown-${this.id}">The lowdown: ${this.content}</P>
                <div>
                    <img src="${this.media_element}" >
                </div>
                <p>Posted by: ${postAuthor.name}, from ${postAuthor.location}</p> 

                <button id="comment-btn-${this.id}" class="comment-btn">View comments!</button>
                <button id="edit-btn-${this.id}" class="edit-btn">Edit your post</button>
            
                <div class="accordion-content" id="accordion-${this.id}">
                    <div id=comment-container-${this.id}>${this.renderAllComments()}</div>
                    <div>
                        <form id="leave-comment-form-${this.id}">
                            <p>Add your own comment!</p>
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
                            Title:
                            <input type="text" id="edit-title-input-${this.id}" placeholder="${this.title}"></input>
                        </div>
                        <div>
                            Feeling: 
                            <input type="text" id="feeling-input-${this.id}" placeholder="${this.content}"></input>
                        </div>
                        <div>
                            Gif:       
                            <input type="text" id="media-input-${this.id}" placeholder="${this.media_element}"></input>  
                        </div>
                        <input type="submit" value="Edit comment">
                    </form>

                </div>


            </div>   
        `
        return postEl
    }



}

