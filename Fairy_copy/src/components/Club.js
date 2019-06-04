import React from 'react';

class Club extends React.Component {

  componentDidMount() {
    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    
    let options = {
        inDuration: 300,
        outDuration: 300
    };
    
    M.Dropdown.init(dropdowns, options);
}


    
    render() {

      const tempStyle={
        float:"right"
      }
      
        return (
            <div>
                  <div className="container club">
                <div className="card">
                    <div className="info">
                        <a className="username">{this.props.cname}


                          <div className="option-button" style={tempStyle}>
                            <a className="dropdown-trigger btn" data-target='dropdown1'>
                              <i className="material-icons icon-button">more_vert</i>
                            </a>
                            <ul id="dropdown1" className="dropdown-content">
                              <li><a href={this.props.link}><i className="material-icons"></i>link</a></li>
                            </ul>
                          </div>

                        </a>

                        

                    </div>
                    <div><p>{this.props.intro}</p></div>
                    <div><p>장소 : {this.props.croom}</p></div>
                                       
                    
                    <div className="footer">
                      <div className="row">
                            <div className="col blue-text text-darken-2"><p># {this.props.tag1}</p></div>
                            <div className="col blue-text text-darken-2"><p># {this.props.tag2}</p></div>
                            <div className="col blue-text text-darken-2"><p># {this.props.tag4}</p></div>
                            <div className="col blue-text text-darken-2"><p># {this.props.tag3}</p></div>
                            <div className="col blue-text text-darken-2"><p># {this.props.tag5}</p></div>  
                      </div>
                    </div>
            
                </div>
            </div>

            </div>
      
      );
    }
}


export default Club;
