var PersoLiveSDK=function(){"use strict";function t(){}function e(t){return t()}function s(){return Object.create(null)}function n(t){t.forEach(e)}function a(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){t.parentNode&&t.parentNode.removeChild(t)}let o;function c(t){o=t}const h=[],d=[];let u=[];const l=[],g=Promise.resolve();let p=!1;function f(t){u.push(t)}const m=new Set;let w=0;function y(){if(0!==w)return;const t=o;do{try{for(;w<h.length;){const t=h[w];w++,c(t),v(t.$$)}}catch(t){throw h.length=0,w=0,t}for(c(null),h.length=0,w=0;d.length;)d.pop()();for(let t=0;t<u.length;t+=1){const e=u[t];m.has(e)||(m.add(e),e())}u.length=0}while(h.length);for(;l.length;)l.pop()();p=!1,m.clear(),c(t)}function v(t){if(null!==t.fragment){t.update(),n(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(f)}}const S=new Set;function $(t,e){const s=t.$$;null!==s.fragment&&(!function(t){const e=[],s=[];u.forEach((n=>-1===t.indexOf(n)?e.push(n):s.push(n))),s.forEach((t=>t())),u=e}(s.after_update),n(s.on_destroy),s.fragment&&s.fragment.d(e),s.on_destroy=s.fragment=null,s.ctx=[])}function E(t,e){-1===t.$$.dirty[0]&&(h.push(t),p||(p=!0,g.then(y)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function M(r,h,d,u,l,g,p,m=[-1]){const w=o;c(r);const v=r.$$={fragment:null,ctx:[],props:g,update:t,not_equal:l,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(h.context||(w?w.$$.context:[])),callbacks:s(),dirty:m,skip_bound:!1,root:h.target||w.$$.root};p&&p(v.root);let $=!1;if(v.ctx=d?d(r,h.props||{},((t,e,...s)=>{const n=s.length?s[0]:e;return v.ctx&&l(v.ctx[t],v.ctx[t]=n)&&(!v.skip_bound&&v.bound[t]&&v.bound[t](n),$&&E(r,t)),e})):[],v.update(),$=!0,n(v.before_update),v.fragment=!!u&&u(v.ctx),h.target){if(h.hydrate){const t=(L=h.target,Array.from(L.childNodes));v.fragment&&v.fragment.l(t),t.forEach(i)}else v.fragment&&v.fragment.c();h.intro&&((M=r.$$.fragment)&&M.i&&(S.delete(M),M.i(b))),function(t,s,r,i){const{fragment:o,after_update:c}=t.$$;o&&o.m(s,r),i||f((()=>{const s=t.$$.on_mount.map(e).filter(a);t.$$.on_destroy?t.$$.on_destroy.push(...s):n(s),t.$$.on_mount=[]})),c.forEach(f)}(r,h.target,h.anchor,h.customElement),y()}var M,b,L;c(w)}class b{$destroy(){$(this,1),this.$destroy=t}$on(e,s){if(!a(s))return t;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(s),()=>{const t=n.indexOf(s);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function L(t,e,s,n){if("a"===s&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===s?n:"a"===s?n.call(t):n?n.value:e.get(t)}"function"==typeof SuppressedError&&SuppressedError;class T extends Error{constructor(){super("Too many requests")}}class _ extends Error{constructor(){super("Request timeout")}}class x extends Error{constructor(){super("Invalid Api key")}}var C,P,k;class I extends EventTarget{static async createSessionId(t,e,s,n,a,r,i){const o=await fetch(`${t}/api/v1/session/`,{body:JSON.stringify({llm_type:s,tts_type:n,model_style:a,prompt:r,document:i}),headers:{"PersoLive-APIKey":e,"Content-Type":"application/json"},method:"POST"});if(!o.ok)throw new x;return(await o.json()).session_id}static async getIceServers(t,e,s){const n=await fetch(`${t}/api/v1/session/${s}/ice-servers/`,{headers:{"PersoLive-APIKey":e},method:"GET"});if(!n.ok)throw new x;return(await n.json()).ice_servers}static async create(t,e,s,n,a,r){let i=await I.createPeerConnection(e),o=i.createDataChannel("message",{protocol:"message"}),c=new I(i,o);n.getTracks().forEach((function(t){i.addTrack(t,n)}));const h=i.addTransceiver("video",{direction:"recvonly"}),d=RTCRtpReceiver.getCapabilities("video");null!==d&&h.setCodecPreferences(d.codecs.filter((t=>"video/VP8"===t.mimeType)));const u=await i.createOffer();await i.setLocalDescription(u);const l=await fetch(`${t}/api/v1/session/${s}/exchange/`,{body:JSON.stringify({client_sdp:u}),headers:{"Content-Type":"application/json"},method:"POST"});if(!l.ok)throw new T;const g=await l.json();await i.setRemoteDescription(g.server_sdp);try{await I.waitFor((()=>c.isReady()),100,50),c.changeSize(a,r)}catch(t){throw new T}return c}static async createPeerConnection(t){return new RTCPeerConnection({sdpSemantics:"unified-plan",iceServers:t})}static async waitFor(t,e,s){let n=0;if(await new Promise((a=>{const r=setInterval((()=>{n+=1,n>=s&&(clearInterval(r),a("bad")),t()&&(clearInterval(r),a("good"))}),e)})),n>=s)throw new _}constructor(t,e){super(),C.add(this),this.pc=t,this.dc=e,this.streams=[],P.set(this,null),this.pc.addEventListener("track",(t=>{this.streams=this.streams.concat(t.streams)})),this.pc.addEventListener("connectionstatechange",(()=>{"disconnected"!==this.pc.connectionState&&"failed"!==this.pc.connectionState&&"closed"!==this.pc.connectionState||L(this,C,"m",k).call(this,{live:!1,code:408,reason:"Request Timeout"})})),L(this,C,"m",k).call(this,{live:!0,code:200,reason:"OK"})}isReady(){return this.streams.length>0&&"open"===this.dc.readyState}subscribeStatus(t){return null!==L(this,P,"f")&&t(new CustomEvent("status",{detail:L(this,P,"f")})),this.addEventListener("status",t),()=>{this.removeEventListener("status",t)}}getStream(){return this.streams[0]}sendMessage(t,e){this.dc.send(JSON.stringify({type:t,data:e}))}chat(t,e){this.sendMessage("chat",{message:t,history:e})}ttstf(t){this.sendMessage("ttstf",{message:t})}hello(){this.sendMessage("hello",{})}recordStart(){this.sendMessage("record-start",{})}recordEndStt(t){this.sendMessage("record-end-stt",{language:t})}recordEndTranslate(t,e){this.sendMessage("record-end-translate",{src_lang:t,dst_lang:e})}changeSize(t,e){this.sendMessage("change-size",{width:t,height:e})}setTemplate(t,e){this.sendMessage("set-template",{model:t,dress:e})}clearBuffer(){this.sendMessage("clear-buffer",{})}renewSession(){this.sendMessage("renew-session",{})}ping(){this.sendMessage("ping",{})}setMessageCallback(t,e){const s=s=>{const n=JSON.parse(s.data);n.type===t&&e(n.data)};return this.dc.addEventListener("message",s),()=>{this.dc.removeEventListener("message",s)}}close(){L(this,C,"m",k).call(this,{live:!1,code:408,reason:"Request Timeout"})}}P=new WeakMap,C=new WeakSet,k=function(t){this.dispatchEvent(new CustomEvent("status",{detail:t})),function(t,e,s,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");"a"===n?a.call(t,s):a?a.value=s:e.set(t,s)}(this,P,t,"f")};class j{setMicStatus(t){this.micStatusHandler.dispatchEvent(new CustomEvent("status",{detail:{status:t}}))}subscribeMicStatus(t){const e=e=>{t(e.detail.status)};return this.micStatusHandler.addEventListener("status",e),()=>{this.micStatusHandler.removeEventListener("status",e)}}subscribeChatLog(t){const e=e=>{t(e.detail.chatLog)};return this.chatLogHandler.addEventListener("chatLog",e),()=>{this.chatLogHandler.removeEventListener("chatLog",e)}}subscribeSessionStatus(t){return this.perso.subscribeStatus((e=>{t(e.detail)}))}constructor(t,e){this.perso=t,this.chatLog=[],this.micStatusHandler=new EventTarget,this.chatLogHandler=new EventTarget,this.ping_time=Date.now()+3e3,t.setMessageCallback("stf",(t=>{this.addMessageToChatLog(t.message,!1),this.setMicStatus(3),setTimeout((()=>{this.setMicStatus(0)}),t.duration+3500)})),t.setMessageCallback("stt",(t=>{this.processChat(t.text)})),t.setMessageCallback("stt-error",(t=>{this.setMicStatus(0)})),t.setMessageCallback("translate-error",(t=>{this.setMicStatus(0)})),t.setMessageCallback("ping",(()=>{this.ping_time=Date.now()})),setInterval((()=>{this.perso.ping(),Date.now()-this.ping_time>5e3&&this.perso.close()}),1e3),e&&setInterval((()=>{t.renewSession()}),6e4)}addMessageToChatLog(t,e){this.chatLog=[{text:t,isUser:e,timestamp:new Date},...this.chatLog],this.chatLogHandler.dispatchEvent(new CustomEvent("chatLog",{detail:{chatLog:this.chatLog}}))}getHistory(){return this.chatLog.map((t=>({content:t.text,role:t.isUser?"Human":"AI"}))).reverse()}async processChat(t){this.setMicStatus(2),this.perso.chat(t,this.getHistory()),this.addMessageToChatLog(t,!0)}processSTF(t){this.setMicStatus(2),this.perso.ttstf(t)}intro(){this.setMicStatus(2),this.perso.hello()}recordStart(){return this.setMicStatus(1),this.perso.recordStart()}recordEnd(){return this.setMicStatus(2),this.perso.recordEndStt()}changeSize(t,e){return this.perso.changeSize(t,e)}setMessageCallback(t,e){return this.perso.setMessageCallback(t,e)}setTemplate(t,e){return this.perso.setTemplate(t,e)}clearBuffer(){return this.setMicStatus(0),this.perso.clearBuffer()}setSrc(t){t.srcObject=this.perso.getStream()}}const D=I.createSessionId,O=I.getIceServers;class A{static async getLLMs(t,e){const s=fetch(`${t}/api/v1/settings/llm_type/`,{headers:{"PersoLive-APIKey":e},method:"GET"}),n=await s;return await n.json()}static async getModelStyles(t,e){const s=fetch(`${t}/api/v1/settings/modelstyle/`,{headers:{"PersoLive-APIKey":e},method:"GET"}),n=await s;return await n.json()}static async getTTSs(t,e){const s=fetch(`${t}/api/v1/settings/tts_type/`,{headers:{"PersoLive-APIKey":e},method:"GET"}),n=await s;return await n.json()}static async getPrompts(t,e){const s=fetch(`${t}/api/v1/prompt/`,{headers:{"PersoLive-APIKey":e},method:"GET"}),n=await s;return await n.json()}static async getDocuments(t,e){const s=fetch(`${t}/api/v1/document/`,{headers:{"PersoLive-APIKey":e},method:"GET"}),n=await s;return await n.json()}}function H(t,e,s){async function n(t,e){return await A.getLLMs(t,e)}async function a(t,e){return await A.getTTSs(t,e)}async function r(t,e){return await A.getModelStyles(t,e)}async function i(t,e){return await A.getPrompts(t,e)}async function o(t,e){return await A.getDocuments(t,e)}return[n,a,r,i,o,async function(t,e){let s,c,h,d,u;try{s=await n(t,e),c=await r(t,e),h=await a(t,e),d=await i(t,e),u=await o(t,e)}catch(t){throw new x}return{llms:s,ttsTypes:h,modelStyles:c,prompts:d,documents:u}},async function(t,e,s,n,a,r,i){return await D(t,e,s,n,a,r,i)},async function(t,e,s){return await O(t,e,s)},async function(t,e,s,n,a,r){return await(async(t,e,s,n,a,r)=>{let i=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1}),o=await I.create(t,e,s,i,n,a);return new j(o,r)})(t,e,s,n,a,r)}]}return new class extends b{constructor(t){super(),M(this,t,H,null,r,{getLLMs:0,getTTSs:1,getModelStyles:2,getPrompts:3,getDocuments:4,getAllSettings:5,createSessionId:6,getIceServers:7,createSession:8})}get getLLMs(){return this.$$.ctx[0]}get getTTSs(){return this.$$.ctx[1]}get getModelStyles(){return this.$$.ctx[2]}get getPrompts(){return this.$$.ctx[3]}get getDocuments(){return this.$$.ctx[4]}get getAllSettings(){return this.$$.ctx[5]}get createSessionId(){return this.$$.ctx[6]}get getIceServers(){return this.$$.ctx[7]}get createSession(){return this.$$.ctx[8]}}({target:document})}();
