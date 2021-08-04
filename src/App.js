import './App.css';
import {useState} from 'react';
function HeaderTag(props){
  function onClickHandler(e){
    e.preventDefault();
    props.onChangeMode();
  }
  return(
    <header>
      <h1>
        <a onClick={onClickHandler} href="index.html">WEB</a>
      </h1>
    </header>
  )
}
function NavTag(props){
  console.log('props.data', props.data);
  function clickHander(e){
    e.preventDefault();
    props.onChangeMode(Number(e.target.dataset.id));
  }
  var lis = [];
  for(var i=0; i<props.data.length; i++){
    lis.push(<li><a data-id={props.data[i].id} onClick={clickHander} href={props.data[i].id+'.html'}>{props.data[i].title}</a></li>);
  } 
  return (
    <nav>
      <ol>
      {lis}
      </ol>
    </nav>
  )
}
function ReadTag(props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.desc}
    </article>
  )
}
function App() {
  // debugger;
  console.log('App render');
  var [mode, setMode] = useState('READ');
  var [id, setId] = useState(1);
  var [topics, setTopics] = useState([
    {id:1, title:'HTML', desc:'HTML is ...'},
    {id:2, title:'CSS', desc:'CSS is ...'}
  ]);
  var [nextId, setNextId] = useState(3);

  function onChangeModeHeader(){
    console.log('onChangeModeHeader');
    setMode('WELCOME');
  }

  function onChangeModeNav(id){
    console.log('onChangeModeNav', id);
    setMode('READ');
    setId(id);
    // id값에 따른 UI를 변경하는 코드 
  }

  function onChangeModeControl(_mode){
    console.log('onChangeModeControl', _mode);
    setMode(_mode);
  }

  var article = null;

  if(mode === 'WELCOME'){
    article = <ReadTag title="Weclome" desc="Hello, WEB"></ReadTag>
  } else if(mode === 'READ'){
    for(var i=0; i<topics.length; i++){
      if(topics[i].id === id){
        article = <ReadTag title={topics[i].title} desc={topics[i].desc}></ReadTag>
        break;
      }
    }
  } else if(mode === 'CREATE'){
    
  function onSubmitHandler(e) {
    e.preventDefault();
    var title = e.target.title.value;
    var desc = e.target.desc.value;

    // ... : 는 복제를 나타내는 최신 문법이다. 
    // 추가를 하려면 새로운 배열을 복제하여 추가 해서 setState를 사용해야 한다.
    // 복제를 안하고 그냥 하면 랜더링이 안됨

    var newTopics = [...topics];
    newTopics.push({
      "id": nextId,
      "title": title,
      "desc": desc
    });

    setTopics(newTopics);
    setNextId(nextId+1);

    // setTopics([...topics,{
    //   "id":3,
    //   "title":title,
    //   "desc":desc
    // }]
  }

    article = (
      // onSubmit은 form태그에 다는 것으로 약속
      <form onSubmit={onSubmitHandler}>
        <h2>Create</h2>
          <p><input name = "title" type="text" placeholder="title"></input></p>
          <p><textarea name ="desc" placeholder="description"></textarea></p>
          <p><input type="submit"></input></p>
      </form>
    )
  } else if(mode === 'UPDATE'){
    article = <div>Update</div>
  }
  return (
    <div>
      <HeaderTag onChangeMode={onChangeModeHeader}></HeaderTag>
      <NavTag onChangeMode={onChangeModeNav} data={topics}></NavTag>
      {article}
      <Control onChangeMode={onChangeModeControl}></Control>
    </div>
  );
}
function Control(props){
  function clickHandler(e){
    e.preventDefault();
    props.onChangeMode(e.target.dataset.mode);
  }
  return (
    <div>
      <a href="/create" data-mode="CREATE" onClick={clickHandler}>create</a> | 
      <a href="/update" data-mode="UPDATE" onClick={clickHandler}>update</a> | 
      <input type="button" value="DELETE" data-mode="delete" onClick={clickHandler}></input>
    </div>);
}

export default App;

/* 컴포넌트가 렌더링이 되는 경우

  · 부모 컴포넌트가 렌더링 됐을 때
  · props에 변경됐을 때
  · state가 변경됐을 때*/
