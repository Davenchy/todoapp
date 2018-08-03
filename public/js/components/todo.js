class Todo {
    constructor(data) {
        this.__BUILD_TODO__(data);
        this.getId = function() {return data.id};
    }

    get dom() { return this.todo; }
    get id() { return this.getId(); }
    get complete() { return this.todo.querySelector('.checker input').checked; }
    get text() { return this.todo.querySelector('input[type=text]').value; }

    set complete(v) {

        var url = `/todoapi/${v?'complete':'notcomplete'}/${this.id}`;
        var todo = this;

        new API(url, 'PUT').request().then((data) => {
            v = JSON.parse(data).complete;
            this.todo.querySelector('.checker input').checked = v;
            if (v && !this.todo.classList.contains('complete')) this.todo.classList.add('complete');
            else if (!v && this.todo.classList.contains('complete')) this.todo.classList.remove('complete');
        }, (e) => console.error(e))

    }
    set text(v) {
        var url = `/todoapi/edit/${this.id}`;
        var todo = this;

        new API(url, 'PUT').request({text: v}).then((data) => {
            v = JSON.parse(data).text;
            this.todo.querySelector('input[type=text]').value = v;
            console.log(data);
        }, (e) => console.error(e));
    }

    delete() {
        var url = `/todoapi/delete/${this.id}`;
        var todo = this;

        new API(url, 'DELETE').request().then((data) => {
            todo.dom.remove();
        }, (e) => console.error(e))
    }

    renderTo(selector) { this.renderToDOM(document.querySelector(selector)); }
    renderToDOM(dom) { this.todo = dom.appendChild(this.dom); }

    __BUILD_TODO__(data) {
        var self = this;

        var todo = document.createElement('div');
        todo.classList.add('todo');
        if (data.complete) todo.classList.add('complete');

        var checker = document.createElement('label');
        checker.classList.add('checker');

        var checker_input = document.createElement('input');
        checker_input.setAttribute('type', 'checkbox');
        checker_input.checked = data.complete;
        checker_input.addEventListener('change', (e) => self.complete = e.target.checked );

        var checker_mark = document.createElement('span');
        checker_mark.classList.add('checkmark');

        checker.appendChild(checker_input);
        checker.appendChild(checker_mark);

        var todo_input = document.createElement('input');
        todo_input.setAttribute('type', 'text');
        todo_input.placeholder = "write todo";
        todo_input.value = data.text;
        todo_input.addEventListener('keydown', (e) => {
            if (e.key === "Enter") self.text = e.target.value;
        });

        var todo_delete = document.createElement('a');
        todo_delete.classList.add('delete');
        todo_delete.addEventListener('click', (e) => self.delete() );

        var todo_delete_icon = document.createElement('i');
        todo_delete_icon.classList.add('ion-md-trash');

        todo_delete.appendChild(todo_delete_icon);

        todo.appendChild(checker);
        todo.appendChild(todo_input);
        todo.appendChild(todo_delete);

        this.todo = todo;
    }
}
