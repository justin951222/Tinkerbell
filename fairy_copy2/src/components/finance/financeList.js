import React, { Component } from 'react';
import Finance from './finance';
import FinanceAdd from'./financeAdd';
import axios from 'axios';


class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      finances: []
    };
    this.callList=this.callList.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }




  componentDidMount() {
    this.callList()
  }




  
  callList(){
     console.log("clubidtest2======\n");
      //console.log(this.props.params.clubid)      
    var club={cid:this.props.params.clubid}  
    console.log(club);

    axios.post('/api/finance/flist',club) .then()
    .then((res) => {
      this.setState({
        finances: res.data
      })
  }).catch((err) => {
      console.log(err);
})
    }
  


  handleRemove(seqno){
    const ta={seqno:JSON.stringify(seqno)};
    const url = '/api/finance/frm';
   axios.post(url,ta);
  }

  render() {
    
    return (
	<div className="row">
	<div className="col s10 offset-s1">
	<div className="card-panel row">
		<table id="finance" className="type09">
			<thead className="thead">
				<tr className = "blue-text text-darken-2">
					<th className = "col s1 thead-th cernter" scope="cols">seqno</th>
					<th className = "col s2 thead-th center" scope="cols">금액</th>
					<th className = "col s2 thead-th center" scope="cols">일시</th>
					<th className = "col s4 thead-th center" scope="cols">비고</th>
					<th className = "col s1 thead-th center" scope="cols">소속</th>
				</tr>
			</thead>
			<tbody className="tbody">
				{ this.state.finances.map((c) =>
				<Finance key={c.seqno} seqno={c.seqno} price={c.price} payday={c.payday} note = {c.note} club={c.club} onRemove={this.handleRemove}/> )
				}
			</tbody>
		</table>
	</div>
	<FinanceAdd cid = {this.props.params.clubid}/>
	</div>
	</div>
      /*<div   className="card-panel row">
      <table  id="finance" className="type09">
        <thead className="thead">
            <tr align = "center"  className = "blue-text text-darken-2">
              <th className = "col thead-th" scope="cols" >seqno</th>
              <th className = "col thead-th" scope="cols" >금액</th>
              <th className = "col thead-th" scope="cols" >일시</th>
              <th className = "col thead-th" scope="cols" >비고</th>
              <th className = "col thead-th" scope="cols" >소속</th>

            </tr>
        </thead>
          <tbody className="tbody">
          
          
          { this.state.finances.map((c) =>
          <Finance key={c.seqno} seqno={c.seqno} price={c.price} payday={c.payday} note = {c.note} club={c.club} onRemove={this.handleRemove}/> )
            }
            
              </tbody>
            </table>
            <FinanceAdd cid = {this.props.params.clubid}/>
    </div>*/
    );
  }
}
export default List;
