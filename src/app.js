import { http } from './http';
import { ui } from './ui';


// getPost when DOM loads
document.addEventListener('DOMContentLoaded', getPosts);


// submitPost: add and edit post
document.querySelector('.post-submit').addEventListener('click', submitPost);


// getPosts function: retrieves all posts from api/db.json
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// submitPost function to add and edit a post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    // const data = {
    //     title: title,
    //     body: body
    // }

    // ES2015 syntax when both key and value names are the same
    const data = {
        title,
        body
    }

    // create post
    http.post('http://localhost:3000/posts', data)
        .then(data => {
            // show success message
            ui.showAlert('Post added successfully', 'alert alert-success');
            // clear title and body fields
            ui.clearFields();
            // then call getPosts again to retrieve latest post
            getPosts();
        })
        .catch(err => console.log(err));
}