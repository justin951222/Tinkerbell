import React from 'react';



class Inventory extends React.Component {
    handleRemove(){
        const{eid, onRemove} =this.props;
        onRemove(eid)
    }
    render() {
        return (
            <tr>
                <td className="col s1 tbody-td center">{this.props.eid}</td>
                <td className="col s2 tbody-td center">{this.props.ename}</td>
                <td className="col s2 tbody-td center">{this.props.eday}</td>
                <td className="col s1 tbody-td center">{this.props.amount}</td>
                <td className="col s4 tbody-td">{this.props.note}</td>
                <td className="col s1 tbody-td center">{this.props.club}</td>
                <td className="col s1 tbody-td"><button className="btn-floating btn-largewaves-effect waves-light btn-small red"><i className="material-icons">remove</i></button></td>
            </tr>
        )
    }
}
export default Inventory;
