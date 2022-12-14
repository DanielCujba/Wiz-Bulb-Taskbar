const dgram = require("node:dgram");
const find = require("local-devices");

class InternetConnection{
    constructor(MAC_address,IP=null){
        if(IP==null){
            this.findIP();
        }
        else{
            this.address=IP;
        }
        this.MAC_address=MAC_address;
        this.port=38899;
        this.setmsg={"method": "setPilot","params": {}};
        this.getmsg={"method":"getPilot","params":{}};
        this.server=new dgram.createSocket("udp4");
    }

    sendData(params){
        const message=this.setmsg;
        message.params=params;
        this.sendMessage(message);
    }
    
    getState(){
        this.sendMessage(this.getmsg);
    }
    
    findIP(){
        find().then(devices=>{
            devices.forEach(device => {
                if(device.mac===this.MAC_address){
                    this.address=device.ip;
                }
            });
        })
    }
    
    sendMessage(message){
        this.server.send(JSON.stringify(message),this.port,this.address);
        this.server.on("message",(msg,rinfo)=>{
            console.log(msg.toString()+" "+rinfo.toString());
        });
    }
}

module.exports={InternetConnection}