import React from 'react';
import axios from 'axios';


class FinanceAdd extends React.Component{

        constructor(props){
            super(props);
            this.state={
                price:'',                 
                payday:'',
                note:'',
                cid:''                 // 리덕스로 참조
            }
       
            this.handleValueChange=this.handleValueChange.bind(this)
            this.addFinance=this.addFinance.bind(this)
            this.formSubmit=this.formSubmit.bind(this)
        }

componentDidMount() {

    this.setState({
        cid: this.props.cid
      })
    
      console.log("financeAdd======\n");
      console.log(this.props.cid);
  }

    formSubmit(e){
        e.preventDefault()
        this.addFinance()
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
    addFinance(){
        
        
        const url = '/api/finance/fadd';
 

     return axios.post(url, this.state)
  }

    render(){
        return(
		<div className="row">
			<form className="col s10 offset-s1" onSubmit={this.formSubmit}>
				<div className="row">
					<div className="input-field col s6">
						<label name="price">금액</label>
						<input type="text" name="price" className="validate" value={this.state.price} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s6">
						<label name="payday">일자</label>
						<input type="text" name="payday" className="validate" value={this.state.payday} onChange={this.handleValueChange}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s10">
						<label name="note">비고</label>
						<input type="text" name="note" className="validate" value={this.state.note} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s2 center">
						<button className="btn-floating btn-largewaves-effect waves-light blue"><i className="material-icons">add</i></button>
					</div>
				</div>
			</form>
		</div>
            /*<form onSubmit ={this.formSubmit}>
                <h1>장부 작성</h1>
                금액: <input type="price" name ="price" value={this.state.price} onChange={this.handleValueChange}/><br/>
                일자:<input type="payday" name ="payday" value={this.state.payday} onChange={this.handleValueChange}/><br/>
                비고:<input type="note" name ="note" value={this.state.note} onChange={this.handleValueChange}/><br/>
                <button type="submit" >제출</button>
               
            </form>*/
    
        )
    }
}

export default FinanceAdd;
