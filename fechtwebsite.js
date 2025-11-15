import { useState } from "react";
export default function ChatUI(){
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  async function sendMessage(){
    const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:input})});
    const data=await res.json();
    setMessages(m=>[...m,{sender:"you",text:input},{sender:"atenea",text:data.reply}]);
    setInput("");
  }
  return (<div><input value={input} onChange={e=>setInput(e.target.value)}/><button onClick={sendMessage}>Enviar</button></div>);
}
