var getFaces = function() {
	$("#face-combo").find("option").remove();

	chrome.runtime.sendMessage(extension, {message: "get"}, function(response) {
		$.each(response.data, function(i, e) {
			key = Object.getOwnPropertyNames(e)[0];
			/* Credit http://stackoverflow.com/a/6679184/1104294 */
			$("#face-combo").append(new Option(e[key], key));
		});
	});
};

var extension = $("#face-extension-id").val();
$("#chat-buttons").append('<button class="button" id="face-button">Faces</button>');

$("#face-button").click(function() {
	$("body").append('<div id="face-popup-bg" class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; left: 0px; width: 100%; height: 100%;"/><div id="face-popup" style="top: 50%; left: 50%; display: block; padding: 10px; position: fixed; width: 200px; z-index: 1001; margin-top: -93.5px; margin-left: -113px;" class="wmd-prompt-dialog"><div align="center"><div><b>Faces</b></div><div id="face-container"><select id="face-combo" style="padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px"/></div><div align="center"><input type="button" id="face-remove" class="button" value="Remove"><input type="button" id="face-add" class="button" value="Add" style="margin-left: 5px"><input type="button" id="face-ok" class="button" value="Ok" style="margin-left: 5px"><input type="button" id="face-cancel" class="button" value="Cancel" style="margin-left: 5px"></div></div></div>');

	$("#face-remove").click(function() {
		/* Credit: http://stackoverflow.com/a/1152817/1104294 */
		if ($('#face-combo option').size() < 1) return;

		value = $("#face-combo").find("option:selected").val();
		chrome.runtime.sendMessage(extension, {message: "remove", data: value}, function(response) {
			if (response.message === "ok")
			{
				$("#face-combo").find("option:selected").remove();
			}
		});
	});

	$("#face-add").click(function() {
		$("#face-add").hide();
		$("#face-remove").hide();
		$("#face-combo").remove();
		$("<input type='text' id='face-text' style='padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px;'>").appendTo("#face-container");
		$("#face-text").focus();
	});

	$("#face-ok").click(function() {
		if ($("#face-text").length != 0)
		{
			chrome.runtime.sendMessage(extension, {message: "add", data: $("#face-text").val()}, function(response) {
				if (response.message === "ok") {
					$("#face-add").show();
					$("#face-remove").show();
					$("#face-text").remove();
					$("<select id='face-combo' style='padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px'/>").appendTo("#face-container");
					getFaces();
					/* Credit http://stackoverflow.com/a/11081461/1104294 */
					setTimeout(function() { $("#face-combo option:last").attr("selected","selected"); }, 100); // similar kludge deeded to wait for select to be populated by getFaces()
				}
			});
		}
		else
		{
			/* Credit http://stackoverflow.com/a/5714243/1104294 */
			$("#input").append($("#face-combo").find("option:selected").text());
			$("#face-cancel").click();
		}
	});

	$("#face-cancel").click(function() {
		$("#face-popup").remove();
		$("#face-popup-bg").remove();
		$("#input").focus();
	});

	$(document).ready(function() {
		getFaces();
	});
});