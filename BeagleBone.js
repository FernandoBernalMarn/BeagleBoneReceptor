var bone = require('bonescript');
var firebase = require('firebase');

var ref = new firebase("https://...firebaseio.com/Users/User1/");
var facebook = ref.child("Facebook"); // Add the name of the child in firebase designate for the app.
var gmail = ref.child("Gmail");
var whatsapp = ref.child("Whatsapp");

var ledPin00 = "USR0"; // Add the value of led in the board.
var ledPin01 = "USR1"; // Add the value of led in the board. 
var ledPin02 = "USR2"; // Add the value of led in the board.
var ledPin03 = "USR3"; // Add the value of led in the board.

var state = bone.LOW; // Add the state of led.

var functionToggleF;
var functionToggleG;
var functionToggleW;

var stateLedF = false; // Stores the flag for status of the led (low or high).

bone.pinMode(ledPin00, bone.OUTPUT); // Set ledPin00 as an output.
bone.pinMode(ledPin01, bone.OUTPUT); // Set ledPin01 as an output.
bone.pinMode(ledPin02, bone.OUTPUT); // Set ledPin02 as an output.
bone.pinMode(ledPin03, bone.OUTPUT); // Set ledPin03 as an output.

bone.digitalWrite(ledPin01, state); // Send the state of pin.
bone.digitalWrite(ledPin02, state); // Send the state of pin.
bone.digitalWrite(ledPin03, state); // Send the state of pin.

faceboookData(); // Call the function for obtain the state of the values in the firebase.
gmailData(); // Call the function for obtain the state of the values in the firebase.
whatsappData(); // Call the function for obtain the state of the values in the firebase.

/*
* Function to obtain the values in the firebase.
*/
function faceboookData(){
    facebook.on("value", function(snapshot){
        if(snapshot.val() != 0){
            if(!stateLedF){
                functionToggleF = setInterval(toggleF, 1000);
                stateLedF = true;
            }
        }
        else{
            clearInterval(functionToggleF);
            stateLedF = false;
        }
    });
}

/*
* Function to obtain the values in the firebase.
*/
function gmailData(){
    gmail.on("value", function(snapshot){
        if(snapshot.val() != 0)
            functionToggleG = setInterval(toggleG, 1000);
        else
            clearInterval(functionToggleG);
    });
}

/*
* Function to obtain the values in the firebase.
*/
function whatsappData(){
    whatsapp.on("value", function(snapshot){
        if(snapshot.val() != 0)
            functionToggleW = setInterval(toggleW, 1000);
        else
            clearInterval(functionToggleW);
    });
}

/*
* Function to listen when the child values is changed.
*/
facebook.on("child_changed", function(snapshot){
    faceboookData();  // Call the function for obtain the state of the values in the firebase.
});

/*
* Function to listen when the child values is changed.
*/
gmail.on("child_changed", function(snapshot){
    gmailData();  // Call the function for obtain the state of the values in the firebase.
});

/*
* Function to listen when the child values is changed.
*/
whatsapp.on("child_changed", function(snapshot){
    whatsappData();  // Call the function for obtain the state of the values in the firebase.
});

/*
* Set the values of the state for the leds in the board.
*/
function toggleF() {
    if(state == bone.LOW)
        state = bone.HIGH;
    else
        state = bone.LOW;
                                
    bone.digitalWrite(ledPin03, state);
}

/*
* Set the values of the state for the leds in the board.
*/
function toggleG() {
    if(state == bone.LOW)
        state = bone.HIGH;
    else
        state = bone.LOW;
                                
    bone.digitalWrite(ledPin02, state);
}

/*
* Set the values of the state for the leds in the board.
*/
function toggleW() {
    if(state == bone.LOW)
        state = bone.HIGH;
    else
        state = bone.LOW;
                                
    bone.digitalWrite(ledPin01, state);
}
