import React , {Component} from 'react';
import axios from 'axios'

class Axios extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[]
         };
    }

    getData = () => {
        axios.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20')
        .then((res) => {
            console.log(res)
            this.setState({
                list:res.data.result
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Axios获取服务器数据</h2>
                <button onClick={this.getData}>获取数据</button>
                <ul>
                    {
                        this.state.list.map((value,key) => {
                            return <li key={key}>{value.title}</li>
                        })
                    }
                    
                </ul>
            </div>
        );
    }
}

export default Axios;