import React,{Component} from 'react'
import Comment from './Comment'

// 也通过父类传入属性
class CommentList extends Component{
  static defaultProps = {
    comments:[]
  }

    render() {        
      // console.log(this.props.comments)
        return (
          <div>          
            {this.props.comments.map((comment, i) => <Comment comment={comment} key={i}  index={i} delFun={this.props.delFun}/>)}
          </div>
        )
      }
}

export default CommentList