import React from "react";
import styles from "./Header.module.scss";

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div style={{
          width:40, height:40, borderRadius:8, background: "linear-gradient(135deg,#2563eb,#06b6d4)"
        }} />
        <div>
          <div style={{fontSize:14, color:"#0f172a", opacity:0.9}}>Реакт</div>
          <div style={{fontSize:18}}>Семинар 5</div>
        </div>
      </div>
    </header>
  );
}
