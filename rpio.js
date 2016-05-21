var rpio = require('rpio');
function connectingStatus(n){
  n.status({fill:"red",shape:"ring",text:"connecting"});
}

function networkReadyStatus(n){
  n.status({fill:"yellow",shape:"ring",text:"connecting..."});
}

function networkErrorStatus(n){
  n.status({fill:"red",shape:"dot",text:"disconnected"});
}

function ioErrorStatus(n, err){
  n.status({fill:"red",shape:"dot",text:"error"});
  n.warn(err);
}

function connectedStatus(n){
  n.status({fill:"green",shape:"dot",text:"connected"});
}
function onStatus(n) {
  n.status({fill:"green",shape:"dot",text:"on"});
}
function offStatus(n) {
  n.status({fill:"red",shape:"dot",text:"off"});
}

function init(RED) {
  RED.nodes.registerType("rpio in",gpioInNode);
  RED.nodes.registerType("rpio out",gpioOutNode);

  rpio.init({
          gpiomem: true,          /* Use /dev/gpiomem */
          mapping: 'physical',    /* Use the P1-P40 numbering scheme */
  });

  function gpioInNode(n) {
    this.pin = n.pin;
    this.state = n.state;
    var node = this;

    RED.nodes.createNode(this,n);
  }

  function gpioOutNode(n) {
    this.pin = n.pin;
    this.state = n.state;
    var node = this;

    RED.nodes.createNode(this,n);
    rpio.open(node.pin, rpio.OUTPUT, rpio.HIGH);

    node.on('input', function(msg) {
      //console.log(msg);
      rpio.write(node.pin, msg.payload);
      if(msg.payload == 0)
        onStatus(node);
      else
        offStatus(node);
    });
  }
}


module.exports = init;
