document.addEventListener('DOMContentLoaded', function() {

  const imageId = 79 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageTag = document.querySelector("#image");
  const imageName = document.querySelector("#name");
  const likes = document.querySelector("#likes");
  const likeBttn = document.querySelector("#like_button");
  const commentForm = document.querySelector("#comment_form");
  const commentSection = document.querySelector("#comments");

  ImageAdapter.getImage(imageURL)
  .then(imageObj => {
    imageTag.src = imageObj.url;
    imageName.innerText = imageObj.name
    likes.innerText = imageObj.like_count

    imageObj.comments.forEach(comment => {
      commentSection.appendChild(new Comment(comment).render());
    })
  })

  likeBttn.addEventListener("click", (event) => {
    let likeCount = likes.innerText
    let count = parseInt(likeCount);
    ++count;
    likes.innerText = count;
    ImageAdapter.updateImageLikes(imageId);
  })

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let formValue = commentForm.querySelector("#comment_input");

    let commentLi = new Comment({
      id: parseInt(commentSection.children[commentSection.children.length - 1].getAttribute('data-id')) + 1,
      content: formValue.value
    })
    
    commentSection.appendChild(commentLi.render())
    ImageAdapter.updateComments(imageId, formValue.value)
  })

  commentSection.addEventListener("click", (event) => {
    if (event.target.parentNode.hasAttribute("data-id")) {
      let id = event.target.parentNode.dataset.id
      ImageAdapter.deleteComment(id).then(data => {
        event.target.parentNode.remove();
      })
    }
  })

})
