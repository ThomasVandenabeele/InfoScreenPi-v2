"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/signalr").build();

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("RefreshScreen").addEventListener("click", function (event) {
    console.log("clicked");
    connection.invoke("RefreshScreens").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});