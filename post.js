class Post {

    constructor(postData) {
        this.id = postData.id
        this.title = postData.title
        this.content = postData.content
        this.media_element = postData.media_element
        this.author_id = postData.author_id
        this.comments = postData.comments
    }

    renderAllComments () {

        let comments = [] 
        let allComments = []
        this.comments.forEach(c => comments.push(c))
        
        for (const el of comments) {
            const commentor = User.findById(parseInt(el.user_id))   
            allComments.push(`<p><strong>${commentor.name}</strong> - ${el.comment}</p>`) 
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
                <h3>Feeling: ${this.title}</h3>
                <p>The lowdown: ${this.content}</P>
                <div>
                    <img 
                    ${this.media_element}
                </div>
                <p>Posted by: ${postAuthor.name}, from ${postAuthor.location}</p> 

                <button id="comment-btn-${this.id}" class="comment-btn">View comments!</button>
                <button id="edit-btn-${this.id}" class="edit-btn">Edit your post</button>
            
                <div class="accordion-content" id="accordion-${this.id}">
                    ${this.renderAllComments()}
                </div>
                <div class="edit-form" id="edit-${this.id}" >
                    <form id="edit-form-${this.id}">
                        <input type="text" class="form-control" id="title-input-${this.id}" placeholder="${this.title}"></input> 
                        <input type="text" class="form-control" id="feeling-input-${this.id}" placeholder="${this.content}"></input>       
                        <input type="text" class="form-control" id="media-input-${this.id}" placeholder="${this.media_element}"></input>  
                        <input type="submit" value="Edit comment">
                    </form>
                </div>
            </div>   
        `
        return postEl
    }

          

}

