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

        const postEl = document.createElement('div')
        postEl.className = 'post-panel'
        postEl.innerHTML = `
            <div id="post-id-${this.id}">
                <h3>Feeling: ${this.title}</h3>
                <p>The lowdown: ${this.content}</P>
                <div>
                    ${this.media_element}
                </div>
                <p>Posted by: ${postAuthor.name}, from ${postAuthor.location}</p> 
            
                <div class="accordion-content" id="accordion-${this.id}">
                    ${this.renderAllComments()}
                </div>
            </div>   
        `

        return postEl
    }

    

}

