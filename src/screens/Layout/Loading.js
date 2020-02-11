import React, {Component} from 'react'
import {ScaleLoader} from 'react-spinners'
class Loading extends Component {

    render(){
        return ( 
            <div className="sweet-loading">
                <ScaleLoader
                    size={1500}
                    color={"#123abc"}
                    css={`
                        z-index: 100;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                    `}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}
export default Loading