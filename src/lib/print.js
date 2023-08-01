/**
 * @param {string | URL | undefined} url
 */
export function printExternal(url) {
	// https://stackoverflow.com/a/14167041
	var printWindow = window.open(
		url,
		'Print',
		'left=200, top=200, width=950, height=500, toolbar=0, resizable=0'
	);
	printWindow?.addEventListener(
		'load',
		function () {
			setTimeout(function () {
				printWindow?.print();
			}, 500);
			setTimeout(function () {
				printWindow?.close();
			}, 1000);
		},
		true
	);
}
