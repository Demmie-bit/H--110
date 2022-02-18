//
prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    hieght: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+ data_uri + '"/>';
    });
}
console.log('ml5 version', ml5.version);

Classifier = ml5.imageClassidier('https://teachablemachine.withgoogle.com/models/GLCEFmOca/model.json', modelLoaded);

function modelLoaded(){
    console.log('model  Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Peace Sign") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "Perfect Sign") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "Normal Hand") {
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }


        if (results[1].label == "Peace Sign") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if (results[1].label == "Perfect Sign") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if (results[1].label == "Normal Hand") {
            document.getElementById("update_emoji2").innerHTML = "&#9995;";
        }
    }
}
