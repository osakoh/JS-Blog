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
}


export const ui = new UI();