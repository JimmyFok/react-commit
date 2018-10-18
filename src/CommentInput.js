import React,{Component} from 'react'

class CommentInput extends Component{
    // 需要数据时用构造器
    constructor(){
        super()
        this.state = {
            username: '',
            content: '',
        }
    }

    componentDidMount(){
        // 调用父类的自动聚焦行为，组件有可能不需要聚焦
        this.props.autoFocus(this.input)
        this.setState(JSON.parse(localStorage.getItem('user'))) 
        //console.log('现在',typeof Date.now())
    }

    handleUsernameChange(event){
        this.setState({
            username:event.target.value 
        })  
        localStorage.setItem('user',JSON.stringify(this.state))              
    }
    handleContentChange(event){
        this.setState({
            content: event.target.value            
        })
    }
    // timeLong(){
    //     let now = Date.now();        
    // }

    handleSubmit(){
        // 通过判断此类在父类是否有相应的属性来进行函数属性的调用
        // 从而实现了子类调动父类属性函数
        // console.log(Date.now() )
        // this.setState({
        //     time: Date.now()        
        // })

        // 果然事件内对state的操作不能立马产生反应，所以需要用到对应结果是要用下方的
        // {...this.state,time:Date.now()}的组合方式来取代上方的直接修改
        if(this.props.onSubmit){
            const { username, content, time } = {...this.state,time:Date.now()}
            this.props.onSubmit({username, content, time})                 
        }               

        // 设置后设定value为空
        this.setState({ content: '' })
    }
    render(){
        return(
            <div className= 'comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名</span>
                    <div className='comment-field-input'>
                        <input 
                            ref = {(input) => this.input=input}
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}                        
                        />
                    </div>                   
                </div>
                <div>
                    <div className='comment-field'>
                        <span className='comment-field-name'>评论内容：</span>
                        <div className='comment-field-input'>
                            <textarea 
                                value={this.state.content}                            
                                onChange={this.handleContentChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className='comment-field-button'>
                        <button
                            onClick={this.handleSubmit.bind(this)}>
                            发布
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentInput