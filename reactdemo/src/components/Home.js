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


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            title:'首页组件'
        };
    }
    render() {
        return (
            <div>
                <Axios />
            </div>

        );
    }
}

export default Home;