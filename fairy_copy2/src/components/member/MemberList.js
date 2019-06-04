import React, { Component } from 'react';
import Member from './Member';
import axios from 'axios';
import Madd from './MemberAdd'



class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      members: []
    };
    this.callList = this.callList.bind(this);
  }




  componentDidMount() {
    this.callList()
  }




  callList(){
     console.log("clubidtest_member======\n");
      //console.log(this.props.params.clubid)      
    var club={cid:this.props.params.clubid}  
    console.log(club);
    axios.post('/api/member/mlist',club) 
    .then((res) => {
      this.setState({
        members: res.data
      })
  }).catch((err) => {
      console.log(err);
})
    }
  
    handleRemove(cid ,sid){
      const id = {cid : JSON.stringify(cid),
                  sid : JSON.stringify(sid)}
      
      axios.post('/api/member/mrm', id)
    }
  

  render() {
    
    return (
	<div className="row">
	<div className="col s8 offset-s2">
	<div className="card-panel row">
		<table id="member" className="type09">
			<thead className="thead">
				<tr className="blue-text text-darken-2">
					<th className = "col s2 thead-th center" scope="cols">이름</th>
					<th className = "col s2 thead-th center" scope="cols">소속</th>
					<th className = "col s2 thead-th center" scope="cols">직책</th>
					<th className = "col s2 thead-th center" scope="cols">SID</th>
					<th className = "col s2 thead-th center" scope="cols">CID</th>
				</tr>
			</thead>
			<tbody className="tbody">
				{ this.state.members.map((c) => 
				<Member key={c.sid} sname={c.sname} cname={c.cname} crank = {c.crank} cid={c.cid} sid={c.sid} onRemove={this.handleRemove}/>)
				}
			</tbody>
		</table>
	</div>
	<Madd/>
	</div>
	</div>
      /*<div   className="card-panel row">
      <table  id="member" className = "type09">
          <thead className="thead">
            <tr align = "center"  className = "blue-text text-darken-2">
              <th className = "col thead-th" scope="cols" >이름</th>
              <th className = "col thead-th" scope="cols">소속</th>
              <th className = "col thead-th" scope="cols">직책</th>
              <th className = "col thead-th" scope="cols">SID</th>
              <th className = "col thead-th" scope="cols">CID</th>
            </tr>
          </thead>


          <tbody className="tbody">
        
          { this.state.members.map((c) => 
          <Member key={c.sid} sname={c.sname} cname={c.cname} crank = {c.crank} cid={c.cid} sid={c.sid} onRemove={this.handleRemove}/>)
            }
              </tbody>
            </table>
            <Madd/>
    </div>*/
    );
  }
}
export default List;
