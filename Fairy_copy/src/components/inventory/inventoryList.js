import React, { Component } from 'react';
import Inventory from './inventory';
import IAdd from './inventoryAdd';
import axios from 'axios';




class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      inventories: []
    };
    this.callList = this.callList.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }



/*clubidtest======
…}
​
children: null
​
history: Object { listenBefore: prop(), listen: prop(), transitionTo: prop(), … }
​
location: Object { pathname: "/inventoryList/zad13", action: "POP", key: "6y1gw7", … }
​
params: Object { clubid: "zad13" }
​
route: {…}
​​
component: function List()
​​
path: "/inventoryList/:clubid"
​​
__proto__: Object { … }
​
routeParams: Object { clubid: "zad13" }
​
*/
  componentDidMount() {
    
      console.log("clubidtest======\n");
      console.log(this.props.params.clubid)//

    this.callList()
  }




  callList(){
  console.log("clubidtest2======\n");
      //console.log(this.props.params.clubid)      
    var club={cid:this.props.params.clubid}  
    console.log(club);
      console.log("club.cidtest4======\n");

    axios.post(`/api/inventory/ilist`,(club))
    .then((res) => {
      this.setState({
        inventories: res.data
      })
  }).catch((err) => {
      console.log(err);
    })
    }
  
  handleRemove(eid){
    console.log("testremove===\n");
    console.log(inventories);
    
    const id = {eid : JSON.stringify(eid)}

    axios.post('/api/inventory/erm', id)
  }

  render() {
    
    return (
	<div className="row">
	<div className="col s10 offset-s1">
	<div className="card-panel row">
		<table id="inventory" className="type09">
			<thead className="thead">
				<tr align="center" className="blue-text text-darken-2">
					<th className = "col s1 thead-th" scope="cols" >ID</th>
					<th className = "col s2 thead-th" scope="cols">품명</th>
					<th className = "col s2 thead-th" scope="cols">획득일</th>
					<th className = "col s1 thead-th" scope="cols">수량</th>
					<th className = "col s4 thead-th" scope="cols">비고</th>
					<th className = "col s1 thead-th" scope="cols">소속</th>
				</tr>
			</thead>
			<tbody className="tbody">
				{ this.state.inventories.map((c) => 
		  		<Inventory key={c.eid}  eid={c.eid} ename={c.ename} eday={c.eday} amount = {c.amount} note={c.note} club={c.club} onRemove={this.handleRemove}/> )
				}
			</tbody>
		</table>
	</div>
	<IAdd className="card=panel" cid = {this.props.params.clubid}/>
	</div>
	</div>
      /*<div   className="card-panel row">
      <table  id="inventory" className = "type09">
          <thead className="thead">
            <tr align = "center"  className = "blue-text text-darken-2">
              <th className = "col thead-th" scope="cols" >ID</th>
              <th className = "col thead-th" scope="cols">품명</th>
              <th className = "col thead-th" scope="cols">획득일</th>
              <th className = "col thead-th" scope="cols">수량</th>
              <th className = "col thead-th" scope="cols">비고</th>
              <th className = "col thead-th" scope="cols">소속</th>

            </tr>
          </thead>


          <tbody className="tbody">
          
          { this.state.inventories.map((c) => 
          <Inventory key={c.eid}  eid={c.eid} ename={c.ename} eday={c.eday} amount = {c.amount} note={c.note} club={c.club} onRemove={this.handleRemove}/> )
            }
            
              </tbody>
            </table>
            <IAdd cid = {this.props.params.clubid}/>
    </div>*/
    );
  }
}
export default List;
