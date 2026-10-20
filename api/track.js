import {configured,redis,hash} from './_redis.js';
const allowed=['page','article','engagement','pdf_open','pdf_download','share','social_drawer'];
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 if(!configured())return res.status(503).json({error:'Analytics storage not configured'});
 try{
 const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
 if(!allowed.includes(body.event))return res.status(400).json({error:'Invalid event'});
 const anon=String(body.anon||'').slice(0,80);if(!/^[a-zA-Z0-9-]{16,80}$/.test(anon))return res.status(400).end();
 const url=String(body.path||'/').slice(0,200).replace(/[^a-zA-Z0-9_/?=.&-]/g,'');
 const seconds=body.event==='engagement'?Math.min(60,Math.max(0,Number(body.seconds)||0)):0;
 const country=String(req.headers['x-vercel-ip-country']||'Unknown').slice(0,60);
 const region=String(req.headers['x-vercel-ip-country-region']||'').slice(0,60);
 const city=String(req.headers['x-vercel-ip-city']||'').slice(0,60);
 const obj={event:body.event,path:url,seconds,at:Date.now(),visitor:hash(anon+process.env.ANALYTICS_SALT),country,region,city};
 await redis([['LPUSH','np:events',JSON.stringify(obj)],['LTRIM','np:events','0','19999']]);
 res.status(204).end();
 }catch{res.status(500).json({error:'Unable to track'})}
}
