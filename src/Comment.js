class Comment {
  constructor(commentObj) {
    this.id = commentObj.id
    this.content = commentObj.content
  }

  render() {
    let commentLi = document.createElement("li");
    commentLi.dataset.id = this.id;
    commentLi.innerHTML = `
      ${this.content} <button>Delete Comment</button>
    `
    return commentLi
  }
}
