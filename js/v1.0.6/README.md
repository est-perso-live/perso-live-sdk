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
    "name": string
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
    "name": string,
    "model": string,
    "style": string
  }
]
```

### Get background image list
```javascript
async function getBackgroundImages(apiServer, apiKey)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
return : JSON
```JSON
[
  {
    "backgroundimage_id": string,
    "title": string,
    "image": string,
    "created_at": string // ex) "2024-05-02T09:05:55.395Z"
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
	"name": string,
	"service": string,
	"speaker": string
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
    "intro_message": string
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
    "search_count": number,
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
  "llms": JSON, // result of getLLMs
  "ttsTypes": JSON, // result of getTTSs
  "modelStyles": JSON, // result of getModelStyles
  "prompts": JSON, // result of getPrompts
  "documents": JSON, // result of getDocuments,
  "backgroundImages": JSON // result of getBackgroundImages
}
```

### Create session id
```javascript
async function createSessionId(apiServer, apiKey, llmType, modelStyle, prompt, document, backgroundImage, chatbotLeft, chatbotTop, chatbotHeight)
```
apiServer : (Required) string / API Server url  
apiKey : (Required) string / API Key  
llmType : (Required) string / LLM type  
ttsType : (Required) string / TTS type  
modelStyle : (Required) string / model_style (ex: ntl-full_dress_nodded)  
prompt : (Required) string / Prompt ID  
document : (Optional) string / Document ID  
backgroundImage : (Optional) string / Background image ID  
chatbotLeft : (Optional) number / Chatbot horizontal position (A number between -1.0 and 1.0, default 0.0)  
chatbotTop : (Optional) number / Chatbot vertical position (A number between 0.0 and 1.0, default 0.0)  
chatbotHeight : (Optional) number / The scale of chatbot height, the width of chatbot cannot exceed the width of the 'BACKGROUND'. (A number between 0.0 and 5.0, default 1.0)  
return : string / Session ID  

### Get ICE Servers
```javascript
async function getIceServers(apiServer, sessionId)
```
apiServer : (Required) string / API Server url  
sessionId : (Required) string / Session ID  
return : Array<RTCIceServer>

### Create session
```javascript
async function createSession(apiServer, iceServers, sessionId, width, height, enableVoiceChat)
```
apiServer : (Required) string / API Server url  
iceServers : (Required) Array<RTCIceServer> / ICE Servers for WebRTC Connection  
sessionId : (Required) string / Session ID  
width : (Required) number / Chatbot video width  
height : (Required) number / Chatbot video height  
enableVoiceChat : (Required) boolean / Whether 'Voice chat' is used
return : Session

## Session
### Get 'SessionID'
```javascript
function getSessionId()
```
return : string / Session ID

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
  live: boolean, // true (session started), false (session not started)
  code: number,  // 200, 408
  reason: string // code 200 -> OK, code 408 -> Request Timeout
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
  isUser: boolean, // true - user, false - chatbot
  text: string, // conversation
  timestamp: Date // conversation timestamp
}
```
return : (() => Void) / unsubscribeChatLog, function to unsubscribe

### Subscribe to 'Chat state' changes from the session
Receive 'Chat state' changes during conversation  
```javascript
function subscribeMicStatus(callback)
```
callback : (Required) ((number) => Void) / Callback for 'Chat state'  
&emsp;number - Chat state / 0 (available), 1 (recording), 2 (analyzing), 3 (chatbot speaking)  
&emsp;Need to control 'send' and 'recordStart' to be called only when 'Chat state' is 0  
return : (() => Void) / unsubscribeChatState, function to unsubscribe

### Subscribe to 'Chat state' changes from the session
Receive the 'StfStartEvent'
```javascript
function subscribeStfStartEvent(callback)
```
callback : (Required) ((StfStartEvent) => Void) / Callback for 'StfStartEvent'  
return : (() => Void) / unsubscribeStfStartEvent, function to unsubscribe
```javascript
StfStartEvent
{
  name: string, // The unique ID of the audio chunk that the chatbot will speak.
  duration: number // The duration of the audio chunk that the chatbot will speak.
}
```

### Send a message to the chatbot
'Chat state' changes to 2  
Triggers the StfStartEvent.  
```javascript
async function processChat(message)
```
message : (Required) string / not empty

### Chatbot speaks the 'message'
Triggers the StfStartEvent.  
```javascript
async function processTTSTF(message)
```
message : (Required) string / not empty

### Chatbot speaks using the 'file' (Experimental)
Does not changed 'Chat state'  
Triggers the StfStartEvent.  
```javascript
async function processSTF(file, format, message)
```
file : (Required) Blob / not empty  
format : (Required) string / File format (wav or mp3)  
message : (Required) string / allow empty, Text to display in conversation log  
return : string / The unique ID assigned to the transmitted voice file. This key is set in the 'name' field of the StfStartEvent.  

### Chatbot introduce itself
```javascript
async function intro()
```

### Start voice chat
'Chat state' changes to 1
```javascript
function startVoiceChat()
```

### Complete voice chat
'Chat state' changes to 2
```javascript
function stopVoiceChat()
```

### Stop chatbot speaking
```javascript
function clearBuffer()
```
Need to control 'clearBuffer' to be called only when 'Chat state' is 3  

### Get user's audio stream
It can be used for various purposes such as recording.
```javascript
function getLocalStream()
```
return : MediaStream  

### Get Chatbot's media(video + audio) stream
It can be used for various purposes such as recording.
```javascript
function getRemoteStream()
```
return : MediaStream  

### Stop session
```javascript
function stopSession()
```
terminate session, chatbot conversation ends immediately.
If successfully terminated, `live:false and code:200` will be sent to subscribeSessionStatus  