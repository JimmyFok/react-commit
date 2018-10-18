/**
 *  编写好最外层整体的APP
 *  先构思好一个app的结构并组合一起。
 */

import React, {Component} from 'react'   // 引入React和React.Compontent
import CommentInput from './CommentInput' // 引入评论输入模块
import CommentList from './CommentList' // 引入评论输入列表

// 定义App类
class CommentApp extends Component{
    // 初始化一个数组，为了保存所有评论数
    constructor(){
        super()
        this.state = {
            comments: [],
            html: "<h1>我来测试转义</h1>"
        }
    }
    
    // 事实证明state是先行于渲染的
    componentWillMount(){
        if(localStorage.getItem('commits')){
            this.setState({
                comments: JSON.parse(localStorage.getItem('commits'))
            })
        }        
    }

    // 评论按钮功能，终于明白为什么要这样再传回去子组件了，为了添加到评论数中
    handleSubmitComment(comment){
        // 未解决任何一项为空时不得发送的效果
        if(!comment) return
        if (!comment.username.replace(/^\s+|\s+$/g,"")) return alert('请输入用户名且不能为空')
        if (!comment.content.replace(/^\s+|\s+$/g,"")) return alert('请输入评论内容且不能为空')

        this.state.comments.push(comment)        
        // 别以为push就可以了，其实原则来说不能直接修改state，需要通过setState来让数组有所变化
        // 而类似vue是可以检测到的
        this.setState({
            comments: this.state.comments
        })
        // 这里就出现了那个不能立即得到对应数据的问题
        // 所以应该
        
        localStorage.setItem('commits',JSON.stringify(this.state.comments))
        // console.log(comment)
    }

    // 自动聚焦
    autoInput(ele){
        // 设置input聚焦
        ele.focus()
    }
    
    // 删除数据
    delFun(that){
        // 这边this需要指向这个域        
        console.log(this)
        console.log(that.props.index)
        this.state.comments.splice(that.props.index,1)
        // 这个setState才会驱动对应的数据重新加载
        this.setState({
            comments: this.state.comments
        })
        localStorage.setItem('commits',JSON.stringify(this.state.comments))
    }

    render(){
        return(
            <div className='wrapper' ref = {(el)=>{this.el=el}} onClick={(()=>console.log(this.props.children))}>
                <CommentInput
                    onSubmit = {this.handleSubmitComment.bind(this)}
                    autoFocus = {this.autoInput.bind(this)} 
                    comments={this.state.comments}  
                    />
                <CommentList comments={this.state.comments} delFun={this.delFun.bind(this)} />
                {/* <div dangerouslySetInnerHTML={{__html: this.state.html}}></div> */}
                {/* {this.props.children}
                {this.state.html}  这样直接插入html会成了字符串，但需要动态完成就需要设定属性dangerouslySetInnerHTML */}
            </div>
        )
    }
}

export default CommentApp  // 默认输出类