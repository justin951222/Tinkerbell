import React from 'react';


class Member extends React.Component {

    handleRemove(){
        const{cid,sid, onRemove} =this.props;
        onRemove(cid,sid)
    }

    render() {
        return (
            <tr>
                 <td className="col tbody-td">{this.props.sname}</td>
                <td className="col tbody-td">{this.props.cname}</td>
                <td className="col tbody-td">{this.props.crank}</td>
                <td className="col tbody-td">{this.props.sid}</td>
                <td className="col tbody-td">{this.props.cid}</td>
                <td className="col tbody-td"><button>수정</button></td>
                <td className="col tbody-td"><button onClick ={this.handleRemove}>삭제</button></td>
            </tr>
        )
    }
}
export default Member;
