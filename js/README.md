# Perso Live SDK release note (js)

## Changes(v1.0.7)
### New feature
Get session information  
&emsp;Added PersoLiveSDK-getSessionInfo  

### Modified
Removed PersoLiveSDK-getIceServers

## Changes(v1.0.6)
### Modified
PersoLiveSDK-createSession  
&emsp;Added 'enableVoiceChat' parameter  

Session-subscribeSessionStatus  
&emsp;Replaced by 'onClose'

### New feature
Added a feature to turn on/off the voice chat (If voice chat is turned off, microphone permission will not be requested)  

## Changes(v1.0.5)
### Modified
Session-getIceServers  
&emsp;Removed the 'apiKey' parameter  

Session-processSTF  
&emsp;Added a return value  

### New feature
Added 'StfStartEvent'  
Added a method to subscribe to 'StfStartEvent'  

## Changes(v1.0.4)
### Modified
Added new error types  

## Changes(v1.0.3)
### New feature
Set chatbot position  

### Modified
PersoLiveSDK-createSessionId  
&emsp;Added 'chatbotLeft' parameter  
&emsp;Added 'chatbotTop' parameter  
&emsp;Added 'chatbotHeight' parameter  

## Changes(v1.0.2)
### New feature
Set chatbot's background image  
&emsp;Added PersoLiveSDK-getBackgroundImages  

Make the chatbot speak using audio (Experimental)  
&emsp;Added Session-processSTF  

Get 'MediaStream'  
&emsp;Added Session-getLocalStream (User's audio stream)  
&emsp;Added Session-getRemoteStream (Chatbot's media(video+audio) stream)  

Get 'Session ID'  
&emsp;Added Session-getSessionId  

### Modified
PersoLiveSDK-getAllSettings  
&emsp;Added 'backgroundImages' in return value  

PersoLiveSDK-createSession  
&emsp;Removed 'continuality' parameter  

PersoLiveSDK-createSessionId  
&emsp;Added 'backgroundImage' parameter  

Session-processSTF  
&emsp; Changed function name to 'processTTSTF'  

Session-recordStart  
&emsp; Changed function name to 'startVoiceChat'  

Session-recordEnd  
&emsp; Changed function name to 'stopVoiceChat'  

### Fixed
Issue where an error related to 'ping' occurs after the session has ended  

## Changes(v1.0.1)
### New feature
Terminate session  
&emsp;Added Session-stopSession  

Set TTS type  
&emsp;Added PersoLiveSDK-getTTSs  

Intro message  
&emsp;Added Session-intro  

### Modified
PersoLiveSDK-getAllSettings  
&emsp;Added 'ttsTypes' in return value  

PersoLiveSDK-createSessionId  
&emsp;Added 'ttsType' parameter  