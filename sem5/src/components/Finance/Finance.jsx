import React, {useState} from "react";

export default function Finance(){
  const [items, setItems] = useState([
    {id:1, label:"Кофе", amount: 120},
    {id:2, label:"Проезд", amount: 60},
  ]);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  const container = {
    display:"flex", flexDirection:"column", gap:12
  };

  function add(){
    const a = parseFloat(amount);
    if(!label.trim() || !a || Number.isNaN(a)) return;
    setItems(prev => [{id:Date.now(), label, amount: a}, ...prev]);
    setLabel(""); setAmount("");
  }
  function remove(id){
    setItems(prev => prev.filter(it => it.id !== id));
  }

  const total = items.reduce((s,i)=> s + Number(i.amount), 0);

  return (
    <div style={container}>
      <div style={{display:"flex", gap:8}}>
        <input
          value={label}
          onChange={e=>setLabel(e.target.value)}
          placeholder="Название расхода"
          style={{flex:1,padding:"10px 12px",borderRadius:10,border:"1px solid #e6e9ef"}}
        />
        <input
          value={amount}
          onChange={e=>setAmount(e.target.value)}
          placeholder="Сумма"
          type="number"
          style={{width:120,padding:"10px 12px",borderRadius:10,border:"1px solid #e6e9ef"}}
        />
        <button onClick={add} style={{
          border:"none", padding:"10px 14px", borderRadius:10, background:"#10b981", color:"white", fontWeight:700, cursor:"pointer"
        }}>Добавить</button>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        {items.map(it=>(
          <div key={it.id} style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:12, borderRadius:10, background:"#fbfdff", border:"1px solid #eef2ff"
          }}>
            <div>
              <div style={{fontWeight:700}}>{it.label}</div>
              <div style={{fontSize:12,color:"#64748b"}}>Сумма: {it.amount} ₽</div>
            </div>
            <div style={{display:"flex", gap:8, alignItems:"center"}}>
              <div style={{fontWeight:800}}>{it.amount} ₽</div>
              <button onClick={()=>remove(it.id)} style={{border:"none", background:"transparent", color:"#ef4444", cursor:"pointer"}}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:6, padding:12, borderRadius:10, background:"#0ea5a3", color:"white", fontWeight:700}}>
        Общая сумма: {total} ₽
      </div>
    </div>
  );
}
