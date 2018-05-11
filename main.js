var lastTime = 0;
var currentVideoObject;

function needToPause(timesToPause, lastTime, currentTime) {
    return timesToPause.filter(function(timeToPause) { return timeToPause > lastTime && timeToPause < currentTime; }).length > 0;
}
function loadVideo(videoId) {
    currentVideoObject = getVideoObject(videoId);
    $("#noVideoMessage").hide();
    $("#video").show();
    $("#videoSource").attr("src", currentVideoObject.src);
    $("#video")[0].load();
}
function getVideoObject(videoId) {
    return videoObjects.filter(function(videoObject) { return videoObject.id === videoId})[0];
}
function highlightVideoChoice(videoId) {
    $(".videoChoice").css("background-color", "");
    $("#" + videoId).css("background-color", "pink");
}

$(document).ready(function() {
    $("#video").on("timeupdate", function() {
        var currentTime = $("#video").prop("currentTime");
        if (needToPause(currentVideoObject.timesToPause, lastTime, currentTime)) {
            $("#video")[0].pause();
            $("#message").html("Click Play to continue");
        }
        lastTime = currentTime;
    }).on("play", function() {
        $("#message").html("");
    }).on("ended", function() {
        $("#message").html("Video ended");
        $("#" + currentVideoObject.id).addClass("completedVideo");
    });
    $(".videoChoice").click(function() {
        highlightVideoChoice(this.id);
        loadVideo(this.id);
    });
});