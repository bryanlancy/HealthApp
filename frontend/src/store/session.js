import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const SET_USERS = "session/setUsers"
const REMOVE_USER = "session/removeUser";


const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const getUsers = () => async (dispatch) => {
  const response = await csrfFetch("/api/users")
  if (response.status === 200) {
    const data = await response.json()
    let { users } = data
    users = Object.assign({}, ...users.map(user => {
      const { username, avatar } = user
      return {
        [user.id]: { username, avatar }
      }
    }))
    dispatch(setUsers(users))
    return users
  }
  return 'Oopsy poopsy...'
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  })
  const data = await response.json()
  dispatch(setUser(data.user))
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case SET_USERS:
      newState = Object.assign({}, state)
      newState.users = action.payload
      return newState
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export default sessionReducer;
