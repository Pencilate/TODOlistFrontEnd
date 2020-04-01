    const initialTodoState = {
        curid: undefined,
        curtitle: undefined,
        curdescription: undefined,
        curstatus: false,
        todorecords: [
          {
            id: 1,
            title: "TestInitialTodo",
            description: "InitialTODO",
            status: true
          }
        ],
    }

    function todoReducer(state = initialTodoState, action) {
    switch (action.type) {
      case 'TODO_CREATE':
        return {
            curid: state.curid,
            curtitle: state.curtitle,
            curdescription: state.curdescription,
            curstatus: state.curstatus,
            todorecords:[
                ...state.todorecords,
                {id:action.id,title:action.title,description:action.description,status:action.status}
            ]
        }
        break;

      case 'TODO_UPDATE':
        let updatedRecordsForPut = [...state.todorecords]
        let recordToUpdateIndex = updatedRecordsForPut.findIndex(x => x.id === action.id);
        updatedRecordsForPut[recordToUpdateIndex] = {id:action.id,title:action.title,description:action.description,status:action.status}
        return {
            curid: state.curid,
            curtitle: state.curtitle,
            curdescription: state.curdescription,
            curstatus: state.curstatus,
            todorecords:updatedRecordsForPut
        }
        break;

      case 'TODO_DELETE':
        let updatedRecordsForDel = [...state.todorecords]
        let recordToDeleteIndex = updatedRecordsForDel.findIndex(x => x.id === action.id);
        updatedRecordsForDel.splice(recordToDeleteIndex,1)
        return {
            curid: state.curid,
            curtitle: state.curtitle,
            curdescription: state.curdescription,
            curstatus: state.curstatus,
            todorecords:updatedRecordsForDel
        }
        break;

      case 'TODO_REFERSH_LIST':
        return {
            curid: state.curid,
            curtitle: state.curtitle,
            curdescription: state.curdescription,
            curstatus: state.curstatus,
            todorecords:action.records
        }
        break;
      case 'TODO_SET_CURRENT':
        return {
            curid: action.id,
            curtitle: action.title,
            curdescription: action.description,
            curstatus: action.status,
            todorecords: state.todorecords
        }
        break;
      default:
        return state
    }
  }

  const initialModalState = {
    openModal: false,
    editMode: false
  }

  function modalReducer(state = initialModalState,action){
    switch (action.type){
      case 'MODAL_VISIBILITY_UPDATE':
        return Object.assign({}, state, {
            openModal: action.visibility
        })
       break;

      case 'MODAL_EDIT_UPDATE':
        return Object.assign({},state,{
            editMode: action.editable
        })
       break;

      default:
        return state
    }
  }
  
  function authReducer(state = {isAuthenticated: false}, action) {
    switch (action.type) {
      case 'USER_LOGIN':
        return {isAuthenticated: true}
        break;

      case 'USER_LOGOUT':
        return {isAuthenticated: false}
        break;

      default:
        return state
    }
  }
  
  function todoAppReducers(state = {}, action) {
    return {
      userAuth: authReducer(state.userAuth, action),
      todos: todoReducer(state.todos, action),
      modal: modalReducer(state.modal, action)
    }
  }

  export default todoAppReducers