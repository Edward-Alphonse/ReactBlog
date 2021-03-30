import axios from 'axios'
import { Api, Network } from '../config/http'

/**
 * action type
 */
const LIST_SUCCESS = 'LIST_SUCCESS'
const LIST_FAILURE = 'LIST_FAILURE'
const DESC_SUCCESS = 'DESC_SUCCESS'
const DESC_FAILURE = 'DESC_FAILURE'
const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
const COMMENT_FAILURE = 'COMMENT_FAILURE'
/**
 * state
 */
const initState = {
  content: '',
  msg: '',
  tags: '',
  desc: '',
  commentSize: '',
  totalElements: 0
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function blog(state = initState, action) {
  switch (action.type) {
    case LIST_SUCCESS:
      return {
        ...state,
        content: [{
          "id": 123,
          "title": "123",
          "commentSize": 1,
          "tags": "123, 456",
          "created_at": Date.parse(new Date())
        }, {
          "id": 456,
          "title": "abc",
          "commentSize": 2,
          "tags": "abc, def",
          "created_at": Date.parse(new Date())
        }],
        msg: "12345",
        tags: "123, 456",
        totalElements: 2
      }
    case DESC_SUCCESS:
      return {
        ...state,
        // desc: action.payload.data,
        // tags: action.payload.data.tags,
        // msg: action.payload.msg
        desc: {
          "title": "123",
          "created_at": Date.parse(new Date()),
          "readSize": 10000,
          "content": "<h1>Supportive policies for <br> China's smart car</h1><br><p>Fermi wasn’t the first person to ask a variant of this question about alien intelligence. But he owns it. The query is known around the world as the Fermi paradox. It’s typically summarized like this: If the universe is unfathomably large, the probability of intelligent alien life seems almost certain.</p><br><br>"
        },
        tags: "123, 456",
        msg: "aaaa"
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentSize: state.desc.comment.push({
          content: action.newComment,
          created_at: +Date.now(),
          user: {
            username: action.username
          }
        })
      }
    case LIST_FAILURE:
    case DESC_FAILURE:
    case COMMENT_FAILURE:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */

function listSuccess(data) {
  return {
    type: LIST_SUCCESS,
    payload: data
  }
}

function listFailure(data) {
  return {
    type: LIST_FAILURE,
    payload: data
  }
}

function descSuccess(data) {
  return {
    type: DESC_SUCCESS,
    payload: data
  }
}

function descFailure(data) {
  return {
    type: DESC_FAILURE,
    payload: data
  }
}

function commentSuccess(data, comment, username) {
  return {
    type: COMMENT_SUCCESS,
    payload: data,
    newComment: comment,
    username: username
  }
}

function commentFailure(data) {
  return {
    type: COMMENT_FAILURE,
    payload: data
  }
}

/**
 * aysnc function
 */

export function getBlogList({
  offset,
  limit,
  tags,
  catalog_id,
  order
}) {
  console.log(offset, limit)
  return dispatch => {
    Network.post(Api.blogs.url(), {
      offset,
      limit,
    }).then(res => {
      if (res.status === 0) {
        dispatch(listSuccess(res))
      } else {
        dispatch(listFailure(res))
      }
    }).catch(err => {
      console.log(err)
    })
    // axios.get('/api/blog', {
    //   params: {
    //     offset,
    //     limit,
    //     tags,
    //     catalog_id,
    //     order
    //   }
    // })
    //   .then(res => {
    //     if (res.status === 200 && res.data.code === 0) {
    //       dispatch(listSuccess(res.data))
    //     } else {
    //       dispatch(listFailure(res.data.msg))
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

  }
}

export function getBlogDesc(id) {
  return dispatch => {
    Network.get(Api.blogDetail.url(), {
      "uid": id
    }).then(res => {
      if (res.status === 0) {
        dispatch(descSuccess(res.data))
      } else {
        dispatch(descFailure(res.data.message))
      }
    }).catch(err => {
      console.log(err)
    })
    // axios.get(`/api/blog/${id}`)
    //   .then(res => {
    //     if (res.status === 200 && res.data.code === 0) {
    //       dispatch(descSuccess(res.data))
    //     } else {
    //       dispatch(descFailure(res.data.message))
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
}

export function createComment({
  blog_id,
  user_id,
  content,
  username
}) {
  return dispatch => {
    axios.post('/api/users/comment', {
      blog_id,
      user_id,
      content
    })
      .then(res => {
        if (res.status === 201 && res.data.code === 0) {
          dispatch(commentSuccess(res.data, content, username))
        } else {
          dispatch(commentFailure(res.data.message))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
