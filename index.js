let state = {
    list: [],
    originalList: [],
    isLoading: false,
}

//this is what will make it display in html
function renderHTML(id, item) {
  document.getElementById(id).innerHTML = item;
}

function showTodo(item){
  return `
  <div class='card' class='${item.completed}'>
      <strong id='num'>${item.id}</strong>   ${item.title}
      <i class="fa fa-circle-thin "></i>
  </div>
`  
};

function showTodos() {
  const {list, isLoading} = state;

  if (isLoading){
    return `<div> Loading lists...</div>`;
  }
  if ( list.length === 0){
    return `<div> No lists </div>`
  }else{
    return list.reduce((acc, item) => {
      return acc + showTodo(item) //gets all the items and send them to showTodo function to display them
    },"")
  }
}

function getTodo() {
  state.isLoading = true
  axios
  .get("https://jsonplaceholder.typicode.com/todos")
    .then(function (response) {
      // handle success
      state.list = response.data //gets the data from api and stores it in state.list
      state.originalList = response.data //gets the data from api and stores it in staet.originalist
      state.isLoading = false;
      render();
    })
    .catch(function (error) {
      // handle error
      state.isLoading = false;
      console.log(error);
    })
}

function render() {
  //the main comes from index.html page
  renderHTML("main", showTodos()); //gets the information from showTodos to render to the webpage
}

render();