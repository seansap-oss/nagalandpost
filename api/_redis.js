import crypto from 'node:crypto';
export const configured=()=>!!(process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN);
export async function redis(commands){
 const r=await fetch(process.env.UPSTASH_REDIS_REST_URL+'/pipeline',{method:'POST',headers:{Authorization:'Bearer '+process.env.UPSTASH_REDIS_REST_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(commands)});
 if(!r.ok)throw Error('Analytics storage error');return r.json();
}
export const hash=(v)=>crypto.createHash('sha256').update(String(v)).digest('hex').slice(0,20);
export function passOK(given){const expected=process.env.ADMIN_PASSWORD;if(!expected||!given)return false;const a=crypto.createHash('sha256').update(String(given)).digest();const b=crypto.createHash('sha256').update(expected).digest();return crypto.timingSafeEqual(a,b)}
