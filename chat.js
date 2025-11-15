import { openai } from "../../lib/openai";
import { fetchWebsiteContent } from "../../lib/fetchWebsite";

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Método no permitido"});
  const {message}=req.body;
  const websiteContent=await fetchWebsiteContent(process.env.WEBSITE_URL);
  const prompt=`Contenido:${websiteContent}
Pregunta:${message}`;
  const completion=await openai.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"user",content:prompt}]});
  res.status(200).json({reply:completion.choices[0].message.content});
}
