import React, { useState, useEffect } from 'react'
import { Avatar, Typography, Paper } from '@material-ui/core'
import { useStyles } from './styles'
import { db } from '../firebase'

const PostList = () => {

  const classes = useStyles()
  const [posts, setPosts] = useState([])
  //posts
  //user attached to post
  useEffect(() => {
    const fetchedPosts = []
    const promises = [] // postPromise to know when to run Promise.all func
    // const commentPromises = []
    db.collection("posts")
      .get()
      .then(postsSnapShot => { // gives snapshot of db
        // reading collection returns array so need to loop
        postsSnapShot.forEach(async (post) => { // async to have order inside the forEach
          let currentPost = {}

          const fetchUser = db.doc(`/users/${post.data().uid}`).get()
          console.log('PushFetchPromise')
          promises.push(fetchUser) // pushes promises before we await otherwise it will be resolved automatically
          const fetchComment = db.collection("comments").where("postId", "==", post.data().postId).get()
          promises.push(fetchComment)

          const user = await fetchUser // after this await is done it resolves the promise
          const userComment = await fetchComment

          currentPost = post.data() // setting post data and pushing it
          currentPost.user = user.data()
          currentPost.comments = []

          userComment.forEach(comment => {
            currentPost.comments.push(comment.data())
          })

          fetchedPosts.push(currentPost)

          // userComment.forEach(async (comment) => {
          //   const getUser = db.doc(`/users/${comment.data().uid}`).get()
          //   console.log('push comments promise')
          //   commentPromises.push(getUser)
          //   const userComment = await getUser
          //   console.log('comments pushed')
          //   currentPost.comments.push({ ...comment.data(), ...userComment.data() })
          // })

          // Promise.all(commentPromises).then(() => {
          //   console.log('currentPost', currentPost)
          //   console.log('pushed')
          //   fetchedPosts.push(currentPost)
          // })
          //comments foreachComment fetch user 
        })
        // this runs after the forEach but doesnt wait for the await within the forEach hence why we need the postPromise

        console.log('checkPromise')
        Promise.all(promises).then(() => { // this only runs after all the promises are resolved
          console.log('settingPosts', fetchedPosts)
          setPosts(fetchedPosts) // setsPost after everthing is pushed into fetchedPosts
        })
      }).catch(error => console.error('error', error))
  }, [])

  const dataCollection = async () => {
    db.doc(`/users2/hdgN9jQnkptFleAVkLOF`).update({
      username: 'name5'
    })
    const queryComments = await db.collectionGroup("comments2").where("uid", "==", 'hdgN9jQnkptFleAVkLOF').get()
    queryComments.docs.forEach(snapshot => {
      snapshot.ref.update({
        username: 'name5'
      })
    })
    const queryPosts = await db.collectionGroup("posts2").where("uid", "==", 'hdgN9jQnkptFleAVkLOF').get()
    queryPosts.docs.forEach(snapshot => {
      snapshot.ref.update({
        username: 'name5'
      })
    })
  }

  // console.log('posts', posts)

  if (!posts.length) {
    return <div>loading...</div>
  }
  // return (
  //   <div>{console.log('posts', posts)}</div>
  // )
  return posts.map((post, index) => {
    return (
      <div key={index} className={classes.post}>
        <button onClick={dataCollection}>CLICK</button>
        <Paper square variant='outlined' style={{ backgroundColor: post.user.postBannerColour }}>
          <div className={classes.postHeader}>
            <Avatar src={post.user.avatar} alt='Avatar' style={{ marginRight: '10px' }} />
            <Typography variant='h4' style={{ fontSize: '15px' }}>{post.user.username}</Typography>
          </div>
        </Paper>
        <div className={classes.postImage}>
          <img src={post.image} alt='' style={{ width: '100%' }} />
        </div>
        <div className={classes.postFooter}>
          <Typography><strong>{post.user.username}</strong> {post.caption}</Typography>
          {post.comments.map((comment, index) => {
            return (
              <div className={classes.comments} key={index}>
                <Avatar src={comment.avatar} alt='Avatar' className={classes.commentsAvatar} />
                <Typography style={{ fontSize: '12px' }}><strong>{comment.username}</strong> {comment.text}</Typography>
              </div>
            )
          })}
        </div>
      </div>
    )
  })
}

export default PostList