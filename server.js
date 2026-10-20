const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

loadEnvFile();
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const API_BASE = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const API_KEY = process.env.OPENAI_API_KEY || '';
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8','.png':'image/png','.jpg':'image/jpeg'};

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !Object.prototype.hasOwnProperty.call(process.env, match[1])) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
}
function send(res, status, body) {
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  res.end(JSON.stringify(body));
}
function readBody(req, limit=12000) {
  return new Promise((resolve,reject)=>{
    let data='';
    req.on('data',chunk=>{data+=chunk;if(data.length>limit){reject(new Error('A solicitação excedeu o limite permitido.'));req.destroy();}});
    req.on('end',()=>{try{resolve(JSON.parse(data||'{}'));}catch{reject(new Error('JSON inválido.'));}});
    req.on('error',reject);
  });
}
const allowedEvents = ['ROTINA','VACINA','VERMIFUGO','ODONTO','CRONICA','PESO','DERMATO','POS_ATENDIMENTO','GERIATRICO','FELINO'];
async function interpret(req,res) {
  if (!API_KEY || API_KEY === 'coloque_sua_chave_aqui') return send(res,503,{error:'API não configurada. Copie .env.example para .env e informe OPENAI_API_KEY.'});
  let body;
  try { body=await readBody(req); } catch(e) { return send(res,400,{error:e.message}); }
  const message=String(body.message||'').trim();
  if (!message || message.length>1200) return send(res,400,{error:'A mensagem é obrigatória e deve ter até 1.200 caracteres.'});
  const pet=body.pet && typeof body.pet==='object' ? body.pet : {};
  const safePet={name:String(pet.name||'Pet').slice(0,80),species:pet.species==='FELINO'?'FELINO':'CANINO',breed:String(pet.breed||'Não informado').slice(0,80),age:Math.max(0,Math.min(40,Number(pet.age)||0)),size:String(pet.size||'Não informado').slice(0,20),event:allowedEvents.includes(pet.event)?pet.event:'ROTINA',dental:Boolean(pet.dental),chronic:Boolean(pet.chronic)};
  const system = 'Você é o componente de interpretação de intenção do CLYVO VET. Não diagnostique, não prescreva, não recomende medicamentos e não dê opinião clínica. Se a mensagem descrever sintomas, urgência, dor, piora ou dúvida clínica, marque needsVet=true e oriente procurar um veterinário; em emergência, procurar atendimento veterinário imediatamente. Nunca invente datas ou dados do histórico. Sua tarefa é classificar a intenção para organizar acompanhamento administrativo/preventivo. Retorne APENAS JSON válido com campos: intent (string curta), intentLabel (string em português), summary (resumo neutro em português), suggestedEvent (um destes códigos: ROTINA,VACINA,VERMIFUGO,ODONTO,CRONICA,PESO,DERMATO,POS_ATENDIMENTO,GERIATRICO,FELINO), needsVet (boolean), response (resposta curta e segura em português). Se não houver contexto suficiente, use ROTINA e peça confirmação.';
  const user = JSON.stringify({mensagemDoTutor:message,contextoPet:safePet,objetivo:'Classificar a intenção e sugerir categoria de acompanhamento sem inferir fatos clínicos.'});
  let apiResponse;
  try {
    apiResponse=await fetch(API_BASE+'/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:MODEL,temperature:0.1,response_format:{type:'json_object'},messages:[{role:'system',content:system},{role:'user',content:user}]})});
  } catch { return send(res,502,{error:'Não foi possível conectar à API de IA. Verifique a conexão e o endereço configurado.'}); }
  const raw=await apiResponse.text();
  if (!apiResponse.ok) {
    let detail='A API de IA recusou a solicitação. Verifique a chave, o modelo e os limites da conta.';
    try { const parsed=JSON.parse(raw); if (parsed.error?.message) detail=String(parsed.error.message).slice(0,400); } catch {}
    return send(res,502,{error:detail});
  }
  let payload;
  try { payload=JSON.parse(raw); } catch { return send(res,502,{error:'A API retornou uma resposta inválida.'}); }
  const content=payload.choices?.[0]?.message?.content;
  let result;
  try { result=JSON.parse(content); } catch { return send(res,502,{error:'A resposta do modelo não veio no formato JSON esperado.'}); }
  const suggestedEvent=allowedEvents.includes(result.suggestedEvent)?result.suggestedEvent:'ROTINA';
  return send(res,200,{intent:String(result.intent||'acompanhamento').slice(0,80),intentLabel:String(result.intentLabel||'Acompanhamento do pet').slice(0,120),summary:String(result.summary||'').slice(0,500),suggestedEvent,needsVet:Boolean(result.needsVet),response:String(result.response||'Confirme as informações com a clínica.').slice(0,700),model:MODEL,provider:'API de IA generativa'});
}
function serveStatic(req,res) {
  let urlPath;
  try { urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('URL inválida.'); }
  const requested=urlPath==='/'?'/index.html':urlPath;
  const normalized=requested.replace(/\\/g,'/');
  const isIndex=normalized==='/index.html';
  const isAsset=normalized.startsWith('/assets/') && !normalized.split('/').some(part=>part.startsWith('.')||part==='..');
  if (!isIndex && !isAsset) {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Arquivo não encontrado.');}
  const filePath=path.resolve(ROOT,'.'+normalized);
  if (!filePath.startsWith(path.join(ROOT,'assets')+path.sep) && !isIndex) {res.writeHead(404);return res.end('Arquivo não encontrado.');}
  fs.readFile(filePath,(err,content)=>{
    if(err){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Arquivo não encontrado.');}
    res.writeHead(200,{'Content-Type':MIME[path.extname(filePath)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(content);
  });
}
http.createServer((req,res)=>{
  if(req.method==='POST'&&req.url==='/api/ai/interpret') return interpret(req,res);
  if(req.url.startsWith('/api/')) return send(res,404,{error:'Endpoint não encontrado.'});
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end('Método não permitido.');}
  serveStatic(req,res);
}).listen(PORT,()=>console.log('CLYVO VET Sprint 4 em http://localhost:'+PORT));
