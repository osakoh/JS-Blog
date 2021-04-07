// UI class contains references to the DOM
class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
            <div class="card mb-2">
                <div class="card-body text-white">
                    <!-- post title -->
                    <h4 class="card-title">${post.title}</h4>
                    <!-- post title -->

                    <!-- post body -->
                    <p class="card-text">${post.body}</p>
                    <!-- post body -->

                    <!-- edit link -->
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <!-- edit link -->

                    <!-- delete link -->
                    <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-trash text-danger"></i>
                    </a>
                    <!-- delete link -->
                </div>
            </div>
            `;
        });

        this.post.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();

        // create div
        const div = document.createElement('div');
        // add classnames
        div.className = className;
        // add text
        div.appendChild(document.createTextNode(message));

        // get parent
        const container = document.querySelector('.postContainer');
        // get posts
        const post = document.querySelector('#posts');
        // insert alert
        container.insertBefore(div, posts);


        // clear alert after 3 secs
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    clearAlert() {
        const currAlert = document.querySelector('.alert');
        if (currAlert) {
            currAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }


    // fillForm function
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        // call changeFormState to 'edit' state
        this.changeFormState('edit');
    }

    // clearIdInput function
    clearIdInput() {
        this.idInput.value = '';
    }

    // changeFormState function
    changeFormState(type) {
        if (type === 'edit') {
            // change submit button 
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-sm btn-warning btn-block';

            // crete cancel button exit edit state
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-sm btn-outline-primary btn-block postCancelButton';
            button.appendChild(document.createTextNode('Cancel Edit'))

            // get parent to insert
            const cardForm = document.querySelector('.card-form');
            // get element to insert before form-end
            const formEnd = document.querySelector('.form-end');

            // insert cancel button
            cardForm.insertBefore(button, formEnd);
        } else {
            // change submit button 
            this.postSubmit.textContent = 'Post';
            this.postSubmit.className = 'post-submit btn btn-sm btn-info btn-block';
            //remove cancel button if present
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // clear id from hidden field
            this.clearIdInput();

            // clear textfield
            this.clearFields();

        }
    }
}


export const ui = new UI();