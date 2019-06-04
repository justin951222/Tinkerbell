import React from 'react';
import axios from 'axios';


class InventoryAdd extends React.Component{

        constructor(props){
            super(props);
            this.state={
                cid:'',                 //로그인 리덕스에서 참조 필요
                ename:'',
                eday:'',
                amount:'',
                note:'',
                eid:''
            }
       
            this.handleValueChange=this.handleValueChange.bind(this)
            this.addInventory=this.addInventory.bind(this)
            this.formSubmit=this.formSubmit.bind(this)
        }

 componentDidMount() {

    this.setState({
        cid: this.props.cid
      })
    
      console.log("InventoryAdd======\n");
      console.log(this.props.cid);
  }

    formSubmit(e){
        e.preventDefault()
        this.addInventory()
        .then((response) =>{
          console.log(response.data)
        })
        .catch(console.log('failed'))
    }

    handleValueChange(e){
        let nexState = {};
        nexState[e.target.name] = e.target.value;
        this.setState(nexState);
    }

    addInventory(){

        const url = '/api/inventory/iadd';
 

     return axios.post(url, this.state)
  }

    render(){
        return(
		<div className="row">
			<form className="col s10 offset-s1" onSubmit={this.formSubmit}>
				<div className="row">
					<div className="input-field col s5">
						<label name="ename">이름</label>
						<input type="text" name ="ename" className="validate" value={this.state.ename} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s5">
						<label name="eday">획득일</label>
						<input type="text" name ="eday" className="validate" value={this.state.eday} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s2">
						<label name="amount">수량</label>
						<input type="text" name ="amount" className="validate" value={this.state.amount} onChange={this.handleValueChange}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s10">
						<label name="note">비고</label>
						<input type="text" name ="note" className="validate" value={this.state.note} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s2 center">
						<button className="btn-floating btn-largewaves-effect waves-light blue"><i className="material-icons">add</i></button>
					</div>
				</div>
			</form>
		</div>
    
        )
    }
}

export default InventoryAdd;
