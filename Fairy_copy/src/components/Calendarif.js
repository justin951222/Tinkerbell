import React from 'react';

class Calendarif extends React.Component {
    render() {
        return (
		<div>
			<h3>{this.props.cal_id}</h3>
			<h5 className="truncate">{this.props.cal_title}</h5>
			<h6 className="truncate">{this.props.cal_date}</h6>
			<p>{this.props.bgo}</p>
		</div>
		
            /*<p>동아리명: {this.props.cal_id}    {this.props.cal_title}    날짜: {this.props.cal_date}  설명 : {this.props.bgo}
            </p>*/
      );
    }
}


export default Calendarif;
