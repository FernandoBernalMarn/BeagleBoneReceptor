var bone = require('bonescript');
var firebase = require('firebase');

var ref = new firebase("https://flickering-inferno-1612.firebaseio.com/Users/User1/");
var facebook = ref.child("Facebook");
var gmail = ref.child("Gmail");
var whatsapp = ref.child("Whatsapp");

var ledPin00 = "USR0";
var ledPin01 = "USR1";
var ledPin02 = "USR2";
var ledPin03 = "USR3";

var state = bone.LOW;

var functionToggleF;
var functionToggleG;
var functionToggleW;

bone.pinMode(ledPin00, bone.OUTPUT);
bone.pinMode(ledPin01, bone.OUTPUT);
bone.pinMode(ledPin02, bone.OUTPUT);
bone.pinMode(ledPin03, bone.OUTPUT);

bone.digitalWrite(ledPin01, state);
bone.digitalWrite(ledPin02, state);
bone.digitalWrite(ledPin03, state);

faceboookData();
gmailData();
whatsappData();

function faceboookData(){
    facebook.on("value", function(snapshot){
        if(snapshot.val() != 0){
            console.log("Facebook is high");
            functionToggleF = setInterval(toggleF, 1000);
        }
        else{
            clearInterval(functionToggleF);
            console.log("Facebook is low");
        }
    });
}

function gmailData(){
    gmail.on("value", function(snapshot){
        if(snapshot.val() != 0){
            functionToggleG = setInterval(toggleG, 1000);
            console.log("Gmail is high");
        }
        else{
            clearInterval(functionToggleG);
            state = bone.LOW;
            bone.digitalWrite(ledPin02, state);
            console.log("Gmail is low");
        }
    });
}

function whatsappData(){
    whatsapp.on("value", function(snapshot){
        if(snapshot.val() != 0){
            functionToggleW = setInterval(toggleW, 1000);
            console.log("Whatsapp is high");
        }
        else{
            clearInterval(functionToggleW);
            console.log("Whatsapp is low");
            
        }
    });
}

facebook.on("child_changed", function(snapshot){
    console.log("Facebook = " + snapshot.val());
    faceboookData();
});

gmail.on("child_changed", function(snapshot){
    console.log("Gmail = " + snapshot.val());
    gmailData();
});

whatsapp.on("child_changed", function(snapshot){
    console.log("Whatsapp = " + snapshot.val());
    whatsappData();
});

function toggleF() {
    if(state == bone.LOW)
        state = bone.HIGH;
    else
        state = bone.LOW;
                                
    bone.digitalWrite(ledPin03, state);
    console.log("F");
}

function toggleG() {
    if(state == bone.LOW)
        state = bone.HIGH;
    else
        state = bone.LOW;
                                
    bone.digitalWrite(ledPin02, state);
    console.log("G");
}

function toggleW() {
    if(state == bone.LOW)
        state = bone.HIGH;
    else
        state = bone.LOW;
                                
    bone.digitalWrite(ledPin01, state);
    console.log("W");
}
