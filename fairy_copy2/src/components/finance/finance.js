import React from 'react';

class Finance extends React.Component{
    handleRemove(){ const {seqno, onRemove } = this.props; onRemove(seqno); } 

    render(){
        return(
		<tr>
		        <td className="col s1 tbody-td center">{this.props.seqno}</td>
		        <td className="col s2 tbody-td center">{this.props.price}</td>
		        <td className="col s2 tbody-td center">{this.props.payday}</td>
		        <td className="col s4 tbody-td">{this.props.note}</td>
		        <td className="col s1 tbody-td center">{this.props.club}</td>
		        <td className="col s1 tbody-td center"><button className="btn-floating btn-largewaves-effect waves-light btn-small blue"><i className="material-icons">create</i></button></td>
		        <td className="col s1 tbody-td center"><button className="btn-floating btn-largewaves-effect waves-light btn-small red" onClick={this.handleRemove}><i className="material-icons">remove</i></button></td>
		</tr>
            /*<tr>
                <td className="col tbody-td">{this.props.seqno}</td>
                <td className="col tbody-td">{this.props.price}</td>
                <td className="col tbody-td">{this.props.payday}</td>
                <td className="col tbody-td">{this.props.note}</td>
                <td className="col tbody-td">{this.props.club}</td>
                <td className="col tbody-td"><button >수정</button></td>
                <td className="col tbody-td"><button onClick={this.handleRemove}>삭제</button></td>
            </tr>*/
        )
    }
}

export default Finance;
