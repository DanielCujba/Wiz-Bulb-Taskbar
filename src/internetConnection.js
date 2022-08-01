const dgram = require("node:dgram");
const find = require("local-devices");

const MAC_adress="a8:bb:50:4c:e6:1a";
const port=38899;
const message={"method": "setPilot","params": {}}
const getmsg={"method":"getPilot","params":{}}
let address="";

const sendData = (params)=>{
    find().then(devices=>{
        devices.forEach(device => {
            if(device.mac===MAC_adress){
                address=device.ip;
            }
        });
        message.params=params
    }).then(()=>{
        server.send(JSON.stringify(message),port,address);
    })   
    const server=new dgram.createSocket("udp4");
    server.on("message",(msg,rinfo)=>{
        console.log(msg.toString()+" "+rinfo.toString());
    });
    
};

module.exports={sendData}