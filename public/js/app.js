var newtodobox = document.querySelector('#newtodobox');
var todos_dom = document.querySelector(".todos-container");
// var todos = [];

newtodobox.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        createTodo(e.target.value);
        newtodobox.value = "";
    }
});

function createTodo(text) {
    new API('/todos', 'POST')
    .setStatus(200, (data) => {
        var todo = new Todo(JSON.parse(data));
        todo.renderToDOM(todos_dom);
    }).json({text});
}

// function RenderAll() {
//     todos_dom.innerHTML = "";
//     todos.forEach(todo => todo.renderToDOM(todos_dom));
// }

function fetchServer() {
    new API('/todos')
    .setStatus(200, (data) => {
        data = JSON.parse(data);
        data.forEach(t => new Todo(t).renderToDOM(todos_dom) );
        // data.forEach(i => todos.push(new Todo(i)) );
        // RenderAll();
    }).send();
}


fetchServer();
