import React, { useState, useEffect } from 'react'
import CommentsData from '../data/CommentsData'
import PostData from '../data/PostData'
import UserData from '../data/UserData'
import { Avatar, Typography, Paper } from '@material-ui/core'
import { useStyles } from './styles'

const PostList = () => {

  const classes = useStyles()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let finalPost = []

    PostData.forEach(post => {
      let currentPost = {}

      UserData.forEach(user => {
        if (user.uid === post.uid) {
          currentPost = {
            username: user.username,
            avatar: user.avatar,
            postBannerColour: user.postBannerColour,
            caption: post.caption,
            image: post.image,
            postId: post.postId,
          }
        }
      })
      currentPost.comments = []
      CommentsData.forEach(comment => {
        if (comment.postId === post.postId) {
          UserData.forEach(user => {
            if (user.uid === comment.uid) {
              let confirmComment = {
                username: user.username,
                avatar: user.avatar,
                text: comment.text,
                postId: comment.postId,
              }
              currentPost.comments.push(confirmComment)
            }
          })
        }
      })
      finalPost.push(currentPost)
    })
    setPosts(finalPost)
  }, [])

  return posts.map((post, index) => {
    return (
      <div key={index} className={classes.post}>
        <Paper square variant='outlined' style={{ backgroundColor: post.postBannerColour }}>
          <div className={classes.postHeader}>
            <Avatar src={post.avatar} alt='Avatar' style={{ marginRight: '10px' }} />
            <Typography variant='h4' style={{ fontSize: '15px' }}>{post.username}</Typography>
          </div>
        </Paper>
        <div className={classes.postImage}>
          <img src={post.image} alt='' style={{ width: '100%' }} />
        </div>
        <div className={classes.postFooter}>
          <Typography><strong>{post.username}</strong> {post.caption}</Typography>
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