import React from 'react';


class Member extends React.Component {

    handleRemove(){
        const{cid,sid, onRemove} =this.props;
        onRemove(cid,sid)
    }

    render() {
        return (
		<tr>
		        <td className="col s2 tbody-td center">{this.props.sname}</td>
		        <td className="col s2 tbody-td center">{this.props.cname}</td>
		        <td className="col s2 tbody-td center">{this.props.crank}</td>
		        <td className="col s2 tbody-td center">{this.props.sid}</td>
		        <td className="col s2 tbody-td center">{this.props.cid}</td>
		        <td className="col s1 tbody-td center"><button className="btn-floating btn-largewaves-effect waves-light btn-small blue"><i className="material-icons">create</i></button></td>
		        <td className="col s1 tbody-td center"><button className="btn-floating btn-largewaves-effect waves-light btn-small red" onClick={this.handleRemove}><i className="material-icons">remove</i></button></td>
		</tr>
            /*<tr>
                 <td className="col tbody-td">{this.props.sname}</td>
                <td className="col tbody-td">{this.props.cname}</td>
                <td className="col tbody-td">{this.props.crank}</td>
                <td className="col tbody-td">{this.props.sid}</td>
                <td className="col tbody-td">{this.props.cid}</td>
                <td className="col tbody-td"><button>수정</button></td>
                <td className="col tbody-td"><button onClick ={this.handleRemove}>삭제</button></td>
            </tr>*/
        )
    }
}
export default Member;
