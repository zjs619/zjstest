import React , {Component} from 'react';

class Testcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            title:'测试组件testcomponent',
            subtitle:'testcompine/subtitle子标题'
        };
    }


    handleClick = () =>{
        //通过props属性获取父组件的getdata方法，并将this.state值传递过去
        this.props.getdata(this.state.subtitle);
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <h4>{this.props.jieshoucanshu}</h4>
                <hr/>

                {this.props.showElem?<h3 onClick={this.handleClick}>
                    点击H3/2
                </h3>:''}
                <hr/>
                <p>{this.state.subtitle}++p</p>
            </div>
        );
    }
}

export default Testcomponent;