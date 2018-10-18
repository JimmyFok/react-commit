import React,{Component} from 'react'


// 通过父类传入属性来获取数据
class Comment extends Component{
    constructor(){
        super()
        this.state = {
            time: ''
        }
    }

    componentWillMount(){
        // 初始化
        this.setState({
            time : this._timeTranslate(Date.now()-this.props.comment.time)            
        })
        this._refreshTime()
    }

    _refreshTime(){
        setInterval(
            ()=>this.setState({
                time : this._timeTranslate(Date.now()-this.props.comment.time)            
            }),5000
        )
    }
    _timeTranslate(time){
        let sec = parseInt(time/1000);
        let min = parseInt(sec/60);
        let hour = parseInt(min/60);
        if(sec===0){
            return '刚刚'
        }
        if(sec>0 && sec<60){
            return sec+'秒前'
        }else if(min>0 && min<60){
            return min+'分钟前'
        }else{
            return hour+'小时'+ parseInt(min%60)+'分钟前'
        }    
    }

    // 虽然清楚计时器，但是还是有问题
    componentWillUnmount () {
        clearInterval(this._refreshTime)
    }

    // 将``包裹的部分编程<code></code>
    _getProcessedContent (content) {
        // 因为用到了dangerouslySetInnerHTML, 它是可以随意地插入html的，为了防止XSS攻击，对标签对进行转译
        return content          
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/`([\S\s]+?)`/g, '<code>$1</code>')  // $1是replace上一个参数，用来代表第一个regexp的语句的值
      }

    render(){
        return(
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username} </span>：
                </div>
                <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}} />
                <div className="timed">
                    <span className="del" onClick={()=>{let that=this;this.props.delFun(that)}}>删除</span>
                    <div>{this.state.time}</div>                    
                </div> 
            </div>
        )
    }
}

export default Comment