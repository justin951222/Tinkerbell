import React from 'react';
import dateFns from 'date-fns';
import axios from 'axios';
import { Calendarif } from 'components';

class Calendar extends React.Component {
//{this.props.cname}이런 식으로 사용 가능

  constructor(props){
        super(props);
        this.state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        calendar:[],
        cid:'',
        hidden_n:false,
        currentcalinfo:[],
        currentdate:''
        };
        
        this.renderHeader = this.renderHeader.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.renderCells = this.renderCells.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.show = this.show.bind(this);
        this.showw = this.showw.bind(this);

      }

  componentDidMount() {

    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    
    let options = {
        inDuration: 300,
        outDuration: 300
    };
    
    M.Dropdown.init(dropdowns, options);


    this.show();        
  }



  show(){

          
            //console.log(this.props.params.clubid)      
          var club={cid:this.props.Clubid,
            Clubid2:this.props.Clubid2,
            job :this.props.job,
            job2 :this.props.job2
          }  

          axios.get('/api/calendar/calendarlist',club) .then()
          .then((res) => {
            this.setState({
              calendar: res.data
            })

        }).catch((err) => {
            console.log("errshow");
        })

            
    }



  showw(){
    
     var calin={selectdate:dateFns.format(this.state.selectedDate,"YYYY-MM-DD"),
            cid:this.state.cid};

            //var selectdate = dateFns.format(this.state.selectedDate,"YYYY-MM-DD");
          axios.post(`/api/calendar/calendarinfo`,calin).then()
          .then((res) => {
            this.setState({
              currentcalinfo: res.data,
              hidden_n:true
            })
        }).catch((err) => {
            console.log("errshow");
        })

            
    }


    
handleCommentClick (e) {

  this.setState({ cid : e.currentTarget.dataset.id });//cid state정해짐

 // If handling it here then..
 // First make the API call using axios
 axios.post(`api/calendar/calendarlist/${this.state.cid}`)
  .then(res => {
    this.setState({
      calendar: res.data
    });
  });
}



  onDateClick (day){

    console.log("hidden\n");
    console.log(this.state);
    this.setState({
        selectedDate: day
    });

        this.showw()
        .then((response) =>{
          console.log("res.data\n");
          console.log(res.data);
          this.setState({
              currentcalinfo: res.data,
              hidden_n:true
            })
        })
        .catch(console.log('failed'));
        console.log("this.stateshoww\n");
            console.log(this.state);
//    dateFns.format(this.state.currentMonth, dateFormat)
//'Tue May 14 2019 00:00:00 GMT+0900 (KST)'
//dateFns.format(this.state.currentMonth,"YYYY MMMM D")
  };



  renderHeader() {
    const dateFormat = "MMMM YYYY";


      const tempStyle={
        float:"right"
      }
      

    return (
	<div className="header row">
		<div className="col m8 s12">
			<div className="row flex-middle">
				<div className="col col-start hide-on-small-only">
					<div className="icon" onClick={this.prevMonth}>chevron_left</div>
				</div>
				<div className="col col-cneter">
					<span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
				</div>
				<div className="col col-end hide-on-small-only">
					<div className="icon" onClick={this.nextMonth}>chevron_right</div>
				</div>
			</div>
		</div>
		<div className="col m4 hide-on-small-only">
			<div className="option-button center">
				<a className='dropdown-trigger btn' href='#' data-target='dropdown2'>가입한 동아리 리스트</a>
				<ul id="dropdown2" className="dropdown-content">
					<li key="1" data-id={this.props.Clubid}  onClick={this.handleCommentClick}>{this.props.Clubid}</li>
				        <li key="2" data-id={this.props.Clubid2} onClick={this.handleCommentClick}>{this.props.Clubid2}</li> 
				</ul>
			</div>
		</div>
	</div>
    );



  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];
    const dateFormat_ = "D MMMM YYYY";

    let days = [];
    let day = startDate;
    let formattedDate = "";

    //dateFns.format(calender[0]
    let queue = new Array();
    const ans = Array(20).fill(null).map(() => Array());



    var checkday;
    

    

        for(let i = 0;i<this.state.calendar.length;i++){
          
              
           let result = Object.values(this.state.calendar[i]);
           
          //console.log(dateFns.format(result[3],dateFormat_));//25 may 2019//14may 2019
        
              if(dateFns.format(this.state.currentMonth,"MMMM YYYY") == dateFns.format(result[4],"MMMM YYYY")){
                     checkday= dateFns.format(result[4],dateFormat);
                      queue.push(checkday);
                        
                      

              } else {
                      
            }
          }

          queue.sort();

          let ans2 = new Array();
          for(let i = 0;i<this.state.calendar.length;i++){
              
                                
              for(let t = 0;t<this.state.calendar.length;t++){
                

                var result_ = Object.values(this.state.calendar[t]);
                
                if(queue[i] == dateFns.format(result_[4],dateFormat)){
                  
                  ans[i][0] = result_[0];
                  ans[i][1] = result_[1];
                  ans[i][2] = result_[2];
                  ans[i][3] = result_[3];
                  ans[i][4] = result_[4];

                  ans2.push(result_[1]);
           
           
                }else{

                }  
              }
              
          }



          //ans배열[1] = 2,"c++테스트",ez13","모의테스트,끝나고 뒷풀이 있음","2019-05-14t03:00:00.000z"
      var startindex = 0;
      var endindex = queue.length;
      var check = true;



      const tempStyle={
        color:"blud",
        fontcolor:"red"
      }


    while (day <= endDate) {

      for (let i = 0; i < 7; i++) {


        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        
        
        if(queue[startindex] === formattedDate){
                

                //console.log("queurtest3======\n");
                //console.log(this.state);//this.props.Clubid, Clubid2,job,job2,username
                
                startindex++;
                check = true;
        }else{
                
          };



        const ca = (
          <span className = "meet" style={tempStyle}>{ans2[startindex-1]}</span> 
    );

           
days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}

          >
            <span className="number">{formattedDate}</span>
             { check? ca : undefined }
            <span className="bg">{formattedDate}</span>

          </div>
        );
        check = false;
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }


  nextMonth(){
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth(){
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
	const cainfoStyle={
		border:"solid #eeeeee 1px",
		height:"537"
	}


    const calinfo = (
	<div className="row flex-middle">
		<div className="col s12 calendarinfo white" style={cainfoStyle}>
			{this.state.currentcalinfo.map((c) => 
				<Calendarif key={c.cal_id}  cal_id={c.cal_id} cid={c.cid} bgo={c.bgo} cal_date={c.cal_date} cal_title={c.cal_title}
				/>)}
		</div>
	</div>
    );

    return (
	<div className="row">
		<div className="calendar col s10 offset-s1">
			<div className="row">
				<div className="calendar col s12">
					{this.renderHeader()}
				</div>
			</div>
			<div className="row">
				<div className="calendar col s9">
					{this.renderDays()}
					{this.renderCells()}
				</div>
				<div className="col s3">
					{this.state.hidden_n? calinfo: undefined}
				</div>
			</div>
		</div>
	</div>
    /*<div className="row">
      <div className="calendar col s7 offset-s1">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
      <div className="col s3">
      {this.state.hidden_n? calinfo: undefined}
      </div>
    </div>*/
    );
  }
}

export default Calendar;
