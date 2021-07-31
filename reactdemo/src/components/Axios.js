import React , {Component} from 'react';
import axios from 'axios'
import moment from 'moment'

class Axios extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { 
            list:[],
            title:'测试子组件1',
            showElem:true
         };
    }
    componentWillMount(){
        //this.getData()
    }
    handleClick = () =>{
        //通过props属性获取父组件的getdata方法，并将this.state值传递过去
        this.props.getdata(this.state.title);
    }
    getTestData = () => {
        axios.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20')
        .then((res) => {
            console.log(res)
            this.setState({
                list:res.data.result,
                title:res.data.result[1].title
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <h3>{this.props.title}</h3>
                <button onClick={this.getTestData}>获取数据</button>
                {this.props.showElem?(
                <button onClick={this.handleClick}>传输数据1</button>
                ):null}
                <ul>
                    {
                        this.state.list.map((value,key) => {
                            return <li key={key}>
                                    {this.state.list[0].title}||
                                <br/>{value.title}
                                    <br />
                                    {value.username}
                                    <br />
                                    {moment(parseInt(value.dateline)).format("YYYY/MM+DD")}
                                    </li>
                        })
                    }
                    
                </ul>
            </div>
        );
    }
}

export default Axios;