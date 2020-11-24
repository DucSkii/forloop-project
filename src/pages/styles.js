import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  post: {
    width: '500px',
    marginBottom: '50px',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  postFooter: {
    padding: '10px',
  },
  comments: {
    display: 'flex',
    alignItems: 'center',
  },
  commentsAvatar: {
    marginRight: '10px',
    width: '25px',
    height: '25px',
  }
})