/*
react获取服务器API接口的数据

    react中没有提供专门的请求数据的模块。所以一般使用第三方请求数据模块实现请求数据

    1.axios          https://guthub.com/axios/axios            axios作者觉得jsonp不友好，推荐使用CORS方式更为干净（后端运行跨域）

        1.安装axios模块   npm install axios  --save   /   cnpm install axios  --save

        2.使用时引用import axios from 'axios'

        3.
        axios.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20')
        .then(function(res){
            console.log(res)
            this.setState({
                list:res.data.result
            })
        })
        .catch(function(err){
            console.log(err)
        })



    2.fetch-jsonp   //特殊情况下需要使用jsonp的时候才使用此方法




*/
import React , {Component} from 'react';
import '../assets/css/index.css'
import Axios from './Axios'
<<<<<<< HEAD
=======
import Testcomponent from './Testcomponent'
>>>>>>> ebf690c1b211deebeeb774735306f25cda32a6e7


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  
<<<<<<< HEAD
            title:'首页组件'
        };
    }
    render() {
        return (
            <div>
                <Axios />
=======
            title:'首页组件props',
            name:'testprops',
            jieshoucanshu:'',
            subtitle:''
        };
    }
    getDatas = (props) =>{
        console.log(props,111111)
        //把子组件传递过来的值赋给this.state中的属性
        this.setState({
            jieshoucanshu:props
        });
    }

    getSubtitle = (props) =>{
        console.log(props,2222)
        //把子组件传递过来的值赋给this.state中的属性
        this.setState({
            subtitle:props
        });
    }

    getDataNull = () =>{

    }
    render() {
        return (
            <div>
                <Axios title={this.state.title} name={this.state.name} showElem={false} getdata={this.getDataNull}/>
               <br/>
                <hr/>
                <br/>
                <Axios showElem={true} getdata={this.getDatas}/>
                <p>
                    1.父组件向子组件传值：直接在子组件的标签上写上自定义的参数名称
                    2.子传父：子组件首先this.props.getdata(参数);然后父组件在子组件的标签上用getdata接收参数
                    然后渲染://{this.state.jieshoucanshu}//
                </p>
                <br/>
                <br/>
                <hr/>
                <br/>
                <br/>

                <Testcomponent showElem={false} jieshoucanshu={this.state.jieshoucanshu?'标题:'+this.state.jieshoucanshu:''} />
                <hr/>
                <Testcomponent showElem={true} getdata={this.getSubtitle} />
                <hr/>
                {this.state.subtitle}
>>>>>>> ebf690c1b211deebeeb774735306f25cda32a6e7
            </div>

        );
    }
}

export default Home;