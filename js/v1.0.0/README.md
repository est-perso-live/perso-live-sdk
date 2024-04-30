# Perso Live SDK details (js)

## PersoLiveSDK
### Get LLM list
```javascript
async function getLLMs(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
[
  {
    "name": "string"
  }
]
```

### Get ModelStyle list
```javascript
async function getModelStyles(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
[
  {
    "name": "string",
    "model": "string",
    "style": "string"
  }
]
```

### Get TTS list
```javascript
async function getTTSs(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
[
  {
	"name": "string",
	"service": "string",
	"speaker": "string"
  }
]
```

### Get prompt list
```javascript
async function getPrompts(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
[
  {
	"name": string,
	"description": string,
	"prompt_id": string,
    "system_prompt": string,
	"require_document": boolean,
    "intro_message": "string"
  }
]
```

### Get document list
```javascript
async function getDocuments(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
[
  {
    "document_id": string,
    "title": string,
    "description": string,
    "search_count": number,,
    "processed": boolean,
    "created_at": string, // ex) "2024-05-02T09:05:55.395Z",
    "updated_at": string // ex) "2024-05-02T09:05:55.395Z"
  }
]
```

### Get all settings
```javascript
async function getAllSettings(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
{
  "llms": JSON // result of getLLMs,
  "ttsTypes": JSON // result of getTTSs,
  "modelStyles": JSON // result of getModelStyles,
  "prompts": JSON // result of getPrompts,
  "documents": JSON // result of getDocuments,
}
```

### Create session id
```javascript
async function createSessionId(apiServer, apiKey, llmType, modelStyle, prompt, document)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
llmType : (Required) string / LLM type  
ttsType : (Required) string / TTS type
modelStyle : (Required) string / model_style (ex: ntl-full_dress_nodded)  
prompt : (Required) string / Prompt ID  
document : (Optional) string / Document ID  
return : string / Session ID

### Get ICE Servers
```javascript
async function getIceServers(apiServer, apiKey, sessionId)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
sessionId : (Required) string / Session ID
return : Array<RTCIceServer>

### Create session
```javascript
async function createSession(apiServer, iceServers, sessionId, width, height, continuality)
```
apiServer : (Required) string / API Server url  
iceServers : (Required) Array<RTCIceServer> / ICE Servers for WebRTC Connection  
sessionId : (Required) string / Session ID  
continuality : (Optional) Boolean / Whether the chatbot is persistent (default false)  
\- true : no time limit, false : time limit(If inactive for more than 3 minutes, the chatbot will be terminated)  
return : Session

## Session
### Specifies the VideoElement to display the chatbot video
```javascript
function setSrc(videoElement)
```
videoElement : (Required) Video (\<video\>)

### Subscribe to state changes from the session  
```javascript
function subscribeSessionStatus(callback)
```
callback : (Required) ((SessionStatus) => Void) / Callback for session status updates
```javascript
SessionStatus
{
  live: Boolean, // true (session started), false (session not started)
  code: Number,  // 200, 408
  reason: String // code 200 -> OK, code 408 -> Request Timeout
}  
```
return : (() => Void) / unsubscribeSessionStatus, function to unsubscribe

### Subscribe to conversation log changes from the session
Receive the entire conversation log whenever it's updated
```javascript
function subscribeChatLog(callback)
```
callback : (Required) ((Array\<Chat\>) => Void) / Callback for conversation log
```javascript
Chat
{
  isUser: Boolean, // true - user, false - chatbot
  text: String, // conversation
  timestamp: Date // conversation timestamp
}
```
return : (() => Void) / unsubscribeChatLog, function to unsubscribe

### Subscribe to 'Chat state' changes from the session
Receive 'Chat state' changes during conversation  
```javascript
function subscribeMicStatus(callback)
```
callback : (Required) ((Number) => Void) / Callback for 'Chat state'  
\- Number - Chat state / 0 (available), 1 (recording), 2 (analyzing), 3 (chatbot speaking)  
\- Need to control 'send' and 'recordStart' to be called only when 'Chat state' is 0  
return : (() => Void) / unsubscribeChatState, function to unsubscribe

### Send a message to the chatbot
'Chat state' changes to 2
```javascript
async function processChat(message)
```
message : (Required) String / not empty

### Chatbot speaks the 'message'
```javascript
async function processSTF(message)
```
message : (Required) String / not empty

### Chatbot introduce itself
```javascript
async function intro()
```

### Start voice recording
'Chat state' changes to 1
```javascript
function recordStart()
```

### Complete voice recording
'Chat state' changes to 2
```javascript
function recordEndStt()
```

### Stop chatbot speaking
```javascript
function clearBuffer()
```
Need to control 'clearBuffer' to be called only when 'Chat state' is 3  