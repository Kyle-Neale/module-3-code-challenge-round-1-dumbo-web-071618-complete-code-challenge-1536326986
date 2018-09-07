class ImageAdapter {

  static getImage(url) {
    return fetch(url)
    .then(resp => resp.json())
    .then(data => data)
  }

  static updateImageLikes(id) {
    return fetch("https://randopic.herokuapp.com/likes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: id
      })
    })
  }

  static updateComments(id, commentContent) {
    return fetch("https://randopic.herokuapp.com/comments", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: id,
        content: commentContent
      })
    })
    .then(resp => resp.json())
    .then(data => data)
  }

  static deleteComment(id) {
    return fetch(`https://randopic.herokuapp.com/comments/${id}`, {
      method: "DELETE"
    })
  }
}
