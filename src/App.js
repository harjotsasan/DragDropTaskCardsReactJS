import React, { useState } from "react";
import './App.css';

function App() {
  const [input, setInput] = useState("");
  
  const [toDoItem, setToDoItem] = useState([]);

  const onChangeHandler = (event) => {
    let inputItem = event.target.value;
    setInput(inputItem);
  }
  const onClickHandler = (event) => {
    setToDoItem((oldInfo)=>{
      return([...oldInfo, input]);
    });
    setInput('');
    event.preventDefault();
  }

  const drag = (event) => {
    var eventTargetId = event.target.id;
    event.dataTransfer.setData("text/plane", eventTargetId);
    // setTimeout(() => {
    //   event.target.style.display = 'none';
    // }, 0);
  }

  
  const allowDrop = (event) => {
    // event.target.style.display = 'flex';
    event.preventDefault();
  }
  const drop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plane");
    // event.target.style.display = 'flex';
    event.target.appendChild(document.getElementById(data));
  }

  return (
    <>
      <div className="body">
        <header>Drag and Drop</header>
        <form>
          <input className="inputinfo" placeholder="Enter Task" value={input} onChange={ (event)=>{onChangeHandler(event)} } />
          <button onClick={onClickHandler}>Add</button>
        </form>
        <div className='dndDivHeading'>
          <p className="p">To-Do Tasks </p>
          <p className="p"> On-Going </p>
          <p className="p"> Completed </p>
        </div>
        <div className="container">
          
          <div className="dndDiv" onDragOver={ (event)=>{allowDrop(event);} } onDrop={ (event)=> {drop(event)} }>
            <ol>
              {
                toDoItem.map((curElm,id) => {
                  return(
                    <li key={id} 
                        id={id} 
                        className="dndItems" 
                        draggable="true" 
                        onDragStart={ (event)=>{drag(event);} }>
                        {curElm}
                      </li>
                  );
                })
              }
            </ol>
          </div>
          
          <div className="dndDiv" onDragOver={ (event)=>{allowDrop(event);} } onDrop={ (event)=> {drop(event)} }>
          </div>
          
          <div className="dndDiv" onDragOver={ (event)=>{allowDrop(event);} } onDrop={ (event)=> {drop(event)} }>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
