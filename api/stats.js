import {configured,redis,passOK,hash} from './_redis.js';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 res.setHeader('Cache-Control','no-store');
 if(!configured())return res.status(503).json({error:'Configure Upstash Redis environment variables'});
 try{
 const ip=String(req.headers['x-forwarded-for']||req.headers['x-real-ip']||'unknown').split(',')[0];const key='np:login:'+hash(ip);
 const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
 if(!passOK(b.password)){
  const out=await redis([['INCR',key],['EXPIRE',key,'900']]);const attempts=Number(out[0]?.result||1);
  return res.status(attempts>=8?429:401).json({error:attempts>=8?'Too many attempts; try again later':'Incorrect password'});
 }
 const lock=await redis([['GET',key]]);if(Number(lock[0]?.result||0)>=8)return res.status(429).json({error:'Try again in 15 minutes'});
 const result=await redis([['LRANGE','np:events','0','19999']]);const events=(result[0]?.result||[]).map(v=>{try{return JSON.parse(v)}catch{return null}}).filter(Boolean);
 const unique=new Set(events.map(e=>e.visitor));const locations={},articles={};const eventsCount={};let seconds=0;
 for(const e of events){eventsCount[e.event]=(eventsCount[e.event]||0)+1;seconds+=e.seconds||0;const loc=[e.city,e.region,e.country].filter(Boolean).join(', ');if(e.event==='page'||e.event==='article')locations[loc]=(locations[loc]||0)+1;if(e.event==='article')articles[e.path]=(articles[e.path]||0)+1}
 const visits=(eventsCount.page||0)+(eventsCount.article||0);
 return res.status(200).json({visits,uniqueVisitors:unique.size,readingMinutes:Math.round(seconds/60),averageSeconds:visits?Math.round(seconds/visits):0,pdfOpens:eventsCount.pdf_open||0,pdfDownloads:eventsCount.pdf_download||0,shares:eventsCount.share||0,locations:Object.entries(locations).sort((a,b)=>b[1]-a[1]).slice(0,12),articles:Object.entries(articles).sort((a,b)=>b[1]-a[1]).slice(0,12),daily:Object.entries(events.reduce((a,e)=>{const d=new Date(e.at).toISOString().slice(0,10);if(e.event==='page'||e.event==='article')a[d]=(a[d]||0)+1;return a},{})).sort((a,b)=>a[0].localeCompare(b[0])).slice(-14),note:'Counts reflect the latest 20,000 tracked events. Location is approximate. No raw visitor IP addresses are stored.'});
 }catch{return res.status(500).json({error:'Analytics request failed'})}
}
