
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


function init(RED) {
  RED.nodes.registerType("gpio in",gpioInNode);
  RED.nodes.registerType("gpio out",gpioOutNode);

  function gpioInNode(n) {
    RED.nodes.createNode(this,n);

  }

  function gpioOutNode(n) {
    RED.nodes.createNode(this,n);

  }
}


module.exports = init;
