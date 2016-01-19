var getDongers = function() {
	$("#donger-combo").find("option").remove();

	chrome.runtime.sendMessage(extension, {message: "get"}, function(response) {
		$.each(response.data, function(i, e) {
			key = Object.getOwnPropertyNames(e)[0];
			/* Credit http://stackoverflow.com/a/6679184/1104294 */
			$("#donger-combo").append(new Option(e[key], key));
		});
	});
};

var extension = $("#donger-extension-id").val();
$("#chat-buttons").append('<button class="button" id="donger-button">Dongers</button>');

$("#donger-button").click(function() {
	$("body").append('<div id="donger-popup-bg" class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; left: 0px; width: 100%; height: 100%;"/><div id="donger-popup" style="top: 50%; left: 50%; display: block; padding: 10px; position: fixed; width: 200px; z-index: 1001; margin-top: -93.5px; margin-left: -113px;" class="wmd-prompt-dialog"><div align="center"><div><b>Dongers</b></div><div id="donger-container"><select id="donger-combo" style="padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px"/></div><div align="center"><input type="button" id="donger-remove" class="button" value="Remove"><input type="button" id="donger-add" class="button" value="Add" style="margin-left: 5px"><input type="button" id="donger-ok" class="button" value="Ok" style="margin-left: 5px"><input type="button" id="donger-cancel" class="button" value="Cancel" style="margin-left: 5px"></div></div></div>');

	$("#donger-remove").click(function() {
		/* Credit: http://stackoverflow.com/a/1152817/1104294 */
		if ($('#donger-combo option').size() < 1) return;

		value = $("#donger-combo").find("option:selected").val();
		chrome.runtime.sendMessage(extension, {message: "remove", data: value}, function(response) {
			if (response.message === "ok")
			{
				$("#donger-combo").find("option:selected").remove();
			}
		});
	});

	$("#donger-add").click(function() {
		$("#donger-add").hide();
		$("#donger-remove").hide();
		$("#donger-combo").remove();
		$("<input type='text' id='donger-text' style='padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px;'>").appendTo("#donger-container");
		$("#donger-text").focus();
	});

	$("#donger-ok").click(function() {
		if ($("#donger-text").length != 0)
		{
			chrome.runtime.sendMessage(extension, {message: "add", data: $("#donger-text").val()}, function(response) {
				if (response.message === "ok") {
					$("#donger-add").show();
					$("#donger-remove").show();
					$("#donger-text").remove();
					$("<select id='donger-combo' style='padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px'/>").appendTo("#donger-container");
					getDongers();
					/* Credit http://stackoverflow.com/a/11081461/1104294 */
					setTimeout(function() { $("#donger-combo option:last").attr("selected","selected"); }, 100); // similar kludge deeded to wait for select to be populated by getDongers()
				}
			});
		}
		else
		{
			/* Credit http://stackoverflow.com/a/5714243/1104294 */
			$("#input").append($("#donger-combo").find("option:selected").text());
			$("#donger-cancel").click();
		}
	});

	$("#donger-cancel").click(function() {
		$("#donger-popup").remove();
		$("#donger-popup-bg").remove();
		$("#input").focus();
	});

	$(document).ready(function() {
		getDongers();
	});
});