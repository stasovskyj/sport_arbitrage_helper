let socket = new WebSocket(WSS);

socket.onopen = () => {
    console.log("%cWebSocket - OK!", "background: green; color: white; display: block;");
};

socket.onmessage = (e) => {
    actionOnDataReceived(e);
};

socket.onclose = (e) => {
    if (e.wasClean) {
        console.log("%cWebSocket відключено, причина=${e.reason}", "background: red; color: white; display: block;");
    } else {
        console.log("%cWebSocket DOWN!", "background: red; color: white; display: block;");
    }
};

socket.onerror = () => {
    console.log("%cWebSocket DOWN!", "background: red; color: white; display: block;");
};

function sendDataViaWebSocket(odds, stake) {
    socket.send(JSON.stringify({ action: "updateCalc", odds: odds, stake: stake }));
}

function sendCommandViaWebSocket(mode) {
    socket.send(JSON.stringify({ action: "switchMode", mode: mode }));
}

function actionOnDataReceived(e) {

    const data = JSON.parse(e.data);

    switch (data.action) {
        case "updateCalc":
            //{"action":"updateCalc","odds":"1.90","stake":"120","currency":"USD"}
            updateCalc(data.stake, data.odds, data.currency);
            break;
        case "switchMode":
            //{"action":"switchMode","mode":1}
            mode = data.mode;
            console.log("Switched to mode: " + data.mode);

            break;
        default:
            console.log("%cWebSocket: Невідомі дані " + data, "background: red; color: white; display: block;");
    }
}
