const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api",{
    func: (params)=>ipcRenderer.send("call",params)
})