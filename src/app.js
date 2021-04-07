import { http } from './http';
import { ui } from './ui';

// event listeners
// getPost when DOM loads
document.addEventListener('DOMContentLoaded', getPosts);


// deletePost: through event delegation
document.querySelector('#posts').addEventListener('click', deletePost);

// submitPost: add and edit post: through event delegation
document.querySelector('.post-submit').addEventListener('click', submitPost);


// edit state eventlistener: through event delegation
document.querySelector('#posts').addEventListener('click', enableEdit);

// eventlistener for cancel button: through event delegation
document.querySelector('.card').addEventListener('click', cancelEdit);

// end of event listeners


// getPosts function: retrieves all posts from api/db.json
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// submitPost function to add(has no id value) and edit(has an id value) a post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    // const data = {
    //     title: title,
    //     body: body
    // }

    // ES2015 syntax when both key and value names are the same
    const data = {
        title,
        body
    }

    // input validation
    if (title === '' || body === '') {
        ui.showAlert('You cannot add an empty field', 'alert alert-danger');
    } else {
        // check if it's in the add or edit state. The add state won't have an 'id' while the edit state has an 'id'
        // no id value, create a post
        if (id === '') {

            // then create post
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

            // has an id value, update/edit post 
        } else {

            // update post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    // show success message
                    ui.showAlert(`Post with title '${data.title}' updated successfully`, 'alert alert-success');

                    // change form state back to 'add'. Also, changeFormState clears the fields 
                    ui.changeFormState('add');

                    // clear title and body fields
                    // ui.clearFields();

                    // then call getPosts again to retrieve latest post
                    getPosts();
                })
                .catch(err => console.log(err));

        }
    }
}



// cancelEdit function
function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        // change state to 'add'
        ui.changeFormState('add');
    }

    e.preventDefault();
}


// enableEdit: updating/editing contains an id
function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // fill form with current post i.e data.title & data.body
        ui.fillForm(data);
    }



    e.preventDefault();
}

// delete post
function deletePost(e) {
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if (confirm('Are you sure?')) {
            http.delete(`
                            http: //localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post deleted...', 'alert alert-success');
                    // call getPost again to retreive the latest post
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }

    e.preventDefault();
}