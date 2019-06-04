import React,{Component} from 'react';
import { Club } from 'components';
import axios from 'axios';

class Clublist extends Component {
	
  constructor(props){
        super(props);
        this.state = {
        clubs: []
        };
        this.show = this.show.bind(this);
      }


componentDidMount(){
    this.show();
}




show(){
    axios.get('/api/club')
            .then((res) => {
                this.setState({
                    clubs: res.data
                })

                
            }).catch((err) => {
                console.log(err);
    })
}

    

    render() {
        return(
            
            <div>
                {this.state.clubs.map((c) => 
                    <Club key={c.id}  id={c.id} cname={c.cname} croom={c.croom} intro={c.intro} tag1={c.tag1}
                tag2={c.tag2} tag3={c.tag3} tag4={c.tag4} tag5={c.tag5} link ={c.link}/>)}
            </div>

            );
    }
}

export default Clublist;