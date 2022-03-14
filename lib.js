const TyDIDs = require("tydids-p2p");

const TydidsP2PMQtt = {
  ethers:TyDIDs.ethers,
  run:async function(tydidsconfig,mqttconfig) {
    const mqtt = require('mqtt')
    const client  = mqtt.connect(mqttconfig.broker)
    const ssi = await TyDIDs.ssi(tydidsconfig.privateKey,true);
    let publishPresentation = {};

    if((typeof tydidsconfig.measurement == 'undefined') || (tydidsconfig.measurement == null)) {
      tydidsconfig.measurement = ssi.identity.address;
    }

    if(typeof tydidsconfig.resubscribe == 'undefined') tydidsconfig.resubscribe = 60000;
    const wrapWrite = async function(data) {
      let iData = {};
      const mangelObject = function(obj,mstr) {
        for (const [key, value] of Object.entries(obj)) {
          if(typeof value !== 'object') {
            iData[mstr+key] = value;
          } else {
            mangelObject(value,mstr+key+'/');
          }
        }
        return obj;
      }
      mangelObject(data,'');
      for (const [key, value] of Object.entries(iData)) {
        console.log(mqttconfig.topic+'/'+key,value);
        client.publish(mqttconfig.topic+'/'+key, ''+value)
      }
    }

    const _subscribe = async function() {
      ssi.onACK(async function(presentation) {
          if(presentation.payload._address == tydidsconfig.presentation) {
              wrapWrite(presentation.payload);
          }

          return {address:ssi.identity.address,_processor:'tydids-p2p-mqtt'};
      });
      ssi.retrievePresentation(tydidsconfig.presentation);
    }

    const query = async function() {

    }

    if(typeof tydidsconfig.presentation !== 'undefined') {
      setInterval(_subscribe,tydidsconfig.resubscribe);
      let presentation = await ssi.retrievePresentation(tydidsconfig.presentation);

      wrapWrite(presentation);
      _subscribe();
    }

    client.subscribe(mqttconfig.topic, function (err) {

    })

    client.on('message', function (topic, message) {
        let elements = topic.split('/');
        let master = publishPresentation;
        for(let i=0;i<elements.length-1;i++) {
          if(elements[i].length > 0) {
              if(typeof master[elements[i]] == 'undefined') {
                master[elements[i]] = {};
              }
              master = master[elements[i]];
          }
        }
        let data = message.toString();
        if(!isNaN(data)) data *= 1;
        master[elements[elements.length-1]] = data;
        ssi.updatePresentation(publishPresentation);
    })
    console.log("Presentation",ssi.identity.address);
  }
}

module.exports=TydidsP2PMQtt
