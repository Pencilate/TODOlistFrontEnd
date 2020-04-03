    const initialTodoState = {
        todorecords: [
        ],
    }

    function todoReducer(state = initialTodoState, action) {
    switch (action.type) {
      case 'TODO_CREATE':
        return {
            todorecords:[
                ...state.todorecords,
                {id:action.id,title:action.title,description:action.description,status:action.status}
            ]
        }

      case 'TODO_UPDATE':
        let updatedRecordsForPut = [...state.todorecords]
        let recordToUpdateIndex = updatedRecordsForPut.findIndex(x => x.id === action.id);
        updatedRecordsForPut[recordToUpdateIndex] = {id:action.id,title:action.title,description:action.description,status:action.status}
        return {
            todorecords:updatedRecordsForPut
        }

      case 'TODO_DELETE':
        let updatedRecordsForDel = [...state.todorecords]
        let recordToDeleteIndex = updatedRecordsForDel.findIndex(x => x.id === action.id);
        updatedRecordsForDel.splice(recordToDeleteIndex,1)
        return {
            todorecords:updatedRecordsForDel
        }

      case 'TODO_REFERSH_LIST':
        return {
            todorecords:action.records
        }

      default:
        return state
    }
  }
  
  function authReducer(state = {isAuthenticated: false}, action) {
    switch (action.type) {
      case 'USER_LOGIN':
        return {isAuthenticated: true}

      case 'USER_LOGOUT':
        return {isAuthenticated: false}

      default:
        return state
    }
  }
  
  function todoAppReducers(state = {}, action) {
    return {
      userAuth: authReducer(state.userAuth, action),
      todos: todoReducer(state.todos, action),
      // modal: modalReducer(state.modal, action)
    }
  }

  export default todoAppReducers