import React from 'react';
import axios from 'axios';


class MemberAdd extends React.Component{

        constructor(props){
            super(props);
            this.state={          
                power:'',           //로그인 리덕스에서 참조 필요
                sid:'',
                cid:''
            }
       
            this.handleValueChange=this.handleValueChange.bind(this)
            this.addMember=this.addMember.bind(this)
            this.formSubmit=this.formSubmit.bind(this)
        }

    formSubmit (e) {
        e.preventDefault()
        this.addMember()
        .then((response) =>{
          console.log(response.data)
        })
        .catch(console.log('failed'))
    }

    handleValueChange (e) {
        let nexState = {};
        nexState[e.target.name] = e.target.value;
        this.setState(nexState);
    }
    addMember(){
        this.state.cid=this.props.clubid
        console.log("membertest\n");
        console.log(this.props.params.clubid);
        const url = '/api/member/madd';                            
     return axios.post(url, this.state)
  }

    render(){
        return(
		<div className="row">
			<form className="col s8 offset-s2" onSubmit={this.formSubmit}>
				<div className="row">
					<div className="input-field col s5">
						<label name="sid">아이디</label>
						<input type="text" name ="sid" className="validate" value={this.state.sid} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s5">
						<label name="power">직책</label>
						<input type="text" name ="power" className="validate" value={this.state.power} onChange={this.handleValueChange}/>
					</div>
					<div className="input-field col s2 center">
						<button type="submit" className="btn-floating btn-largewaves-effect waves-light blue"><i className="material-icons">add</i></button>
					</div>
				</div>
			</form>
		</div>
            /*<form onSubmit ={this.formSubmit}>
                <h1>동아리원 추가</h1>
                아이디: <input type="text" name ="sid" value={this.state.sid} onChange={this.handleValueChange}/><br/>
                직책:<input type="text" name ="power" value={this.state.power} onChange={this.handleValueChange}/><br/>
                <button type="submit" >추가하기</button>
               
            </form>*/
    
        )
    }
}

export default MemberAdd;
