import React from 'react';

const tempStyle={
  padding: "25px",
  background: "#22b8cf",
  color: "white"
}


const TodoListTemplate = ({form, children}) => {
  return (
    
        <div className="container write">
                <div style={tempStyle}>일정</div>
                <div className="card">
                    <div className="card-action">
                          {children}
                    </div>
                </div>
            </div>
  );
};


export default TodoListTemplate;

