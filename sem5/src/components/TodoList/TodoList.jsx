import React, {useState} from "react";
import styled, {css} from "styled-components";

const Wrap = styled.div`
  display:flex; flex-direction:column; gap:12px;
`;

const InputRow = styled.div`
  display:flex; gap:8px;
`;

const Input = styled.input`
  flex:1;
  padding:10px 12px;
  border-radius:10px;
  border:1px solid #e6e9ef;
  font-size:14px;
  outline:none;
  &:focus { box-shadow:0 6px 18px rgba(37,99,235,0.12); border-color:#2563eb; }
`;

const AddBtn = styled.button`
  padding:10px 14px;
  border-radius:10px;
  background:linear-gradient(90deg,#2563eb,#06b6d4);
  color:white; font-weight:600; border:none; cursor:pointer;
`;

const Item = styled.div`
  display:flex; align-items:center; justify-content:space-between;
  padding:10px; border-radius:10px;
  background:#fbfdff;
  border:1px solid #eef2ff;
`;

const Text = styled.span`
  font-size:15px;
  ${props => props.done && css`
    text-decoration: line-through;
    color:#94a3b8;
    opacity:0.9;
  `}
`;

export default function TodoList(){
  const [list, setList] = useState([
    {id:1, text:"Сделать домашку", done:false}
  ]);
  const [val, setVal] = useState("");

  function add(){
    if(!val.trim()) return;
    setList(prev => [{id:Date.now(), text:val, done:false}, ...prev]);
    setVal("");
  }
  function toggle(id){
    setList(prev => prev.map(i => i.id===id ? {...i, done: !i.done} : i));
  }
  function remove(id){
    setList(prev => prev.filter(i => i.id !== id));
  }

  return (
    <Wrap>
      <InputRow>
        <Input value={val} onChange={e=>setVal(e.target.value)} placeholder="Добавить задачу..." />
        <AddBtn onClick={add}>Добавить</AddBtn>
      </InputRow>

      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        {list.map(it=>(
          <Item key={it.id}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <input type="checkbox" checked={it.done} onChange={()=>toggle(it.id)} />
              <Text done={it.done}>{it.text}</Text>
            </div>

            <div style={{display:"flex", gap:8}}>
              <button onClick={()=>toggle(it.id)} style={{border:"none",background:"transparent",cursor:"pointer"}}>{it.done ? "↺" : "✓"}</button>
              <button onClick={()=>remove(it.id)} style={{border:"none",background:"transparent",cursor:"pointer", color:"#ef4444"}}>✕</button>
            </div>
          </Item>
        ))}
      </div>
    </Wrap>
  );
}
