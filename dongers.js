$('#chat-buttons').append('<button class="button" id="donger-button">Dongers</button>');

$('#donger-button').click(function() {
	$('body').append('<div id="donger-popup-bg" class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; left: 0px; width: 100%; height: 100%;"/>' +
					'<div id="donger-popup" style="top: 50%; left: 50%; display: block; padding: 10px; position: fixed; width: 150px; z-index: 1001; margin-top: -93.5px; margin-left: -113px;" class="wmd-prompt-dialog">' +
						'<div align="center">' +
							'<div>' +
								'<b>Dongers</b>' +
							'</div>' +
							'<div>' +
								'<select id="donger-combo" style="padding: 5px; width: 95%; margin-top: 10px; margin-bottom: 10px" />' +
							'</div>' +
							'<div align="center">' +
								'<input type="button" id="donger-add" class="button" value="Add">' +
								'<input type="button" id="donger-ok" class="button" value="Ok" style="margin: 5px">' +
								'<input type="button" id="donger-cancel" class="button" value="Cancel">' +
							'</div>' +
						'</div>' +
						'<script type="text/javascript">' +
							'var items = [{' +
								'text: "(ʘ ͜ʖ ʘ)",' +
								'value: 1' +
							'}];' +
							'$("#donger-ok").click(function() {' +
								'/* Credit http://stackoverflow.com/a/5714243/1104294 */' +
								'$("#input").val(function(_, val) {' +
									'return val + $("#donger-combo").find("option:selected").text();' +
								'});' +
								'$("#donger-cancel").click();' +
							'});' +
							'$("#donger-cancel").click(function() {' +
								'$("#donger-popup").remove();' +
								'$("#donger-popup-bg").remove();' +
								'$("#input").focus();' +
							'});' +
							'$(document).ready(function() {' +
								'/* Credit http://stackoverflow.com/a/6679184/1104294 */' +
								'$.each(items, function(i, e) {' +
									'$("#donger-combo").append(new Option(e.text, e.value));' +
								'});' +
							'});' +
						'</script>' +
					'</div>');
});
