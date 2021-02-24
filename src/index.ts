declare var Nirvana: any;

var mySession: any;
var myChannel: any;

var realmName: string = "";
var channelName: string = "mychannel";

console.log("testee", Nirvana);

createSession();

function createSession() {
  let sessionConfigs = {
    realms: [realmName],
    drivers: Nirvana.Driver.WEBSOCKET
  }

  mySession = Nirvana.createSession(sessionConfigs);
  mySession.on(Nirvana.Observe.START, handleSessionStarted)

  mySession.start();
}

function handleSessionStarted(e: any) {
  console.log("session-started", e);

  connectChannel();
}

function connectChannel() {
  myChannel = mySession.getChannel(channelName);

  // myChannel.setStartEID(50) //start id
  myChannel.setFilter("title in ('aaaaa', 'ccccc', 'bbbbb')");

  myChannel.on(Nirvana.Observe.DATA, handleEvent);
  myChannel.on(Nirvana.Observe.ERROR, handleEvent);

  myChannel.subscribe();
}

function handleEvent(e: any) {
  let dictionary = e.getDictionary();
  let data = dictionary.innerProperties;
  console.log("handle-event", data);

  addMessage(dictionary.get("title"), dictionary.get("message"))
}

function handleEventError(e: any) {
  console.log("handle-event-error", e);
}

function addMessage(title: string, value: string) {
  let element = document.getElementById("all-messages");
  element.innerHTML += `title: ${title}; message: ${value}\n`;

  if (title === "aaaaa") {
    element = document.getElementById("aaaaa-messages");
    element.innerHTML += `${value}\n`;
  }
  else if (title === "bbbbb") {
    element = document.getElementById("bbbbb-messages");
    element.innerHTML += `${value}\n`;
  }
}