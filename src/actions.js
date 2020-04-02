export function login() {
  return {
    type: 'USER_LOGIN',
  }
}

export function logout() {
    return {
      type: 'USER_LOGOUT',
    }
}

export function createTODO(id,title,description,status) {
    return {
      type: 'TODO_CREATE',
      id:id,
      title: title,
      description: description,
      status:status
    }
}

export function updateTODO(id,title,description,status) {
    return {
      type: 'TODO_UPDATE',
      id:id,
      title: title,
      description: description,
      status:status
    }
}

export function deleteTODO(id) {
    return {
      type: 'TODO_DELETE',
      id:id,
    }
}

export function setTODO(todoArray) {
    return {
        type: 'TODO_REFERSH_LIST',
        records: todoArray,
    }
}

export function setCurrentTODO(id,title,description,status) {
    return {
        type: 'TODO_SET_CURRENT',
        id:id,
        title: title,
        description: description,
        status:status
    }
}

