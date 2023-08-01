<script>
	import { browser } from '$app/environment';
	import QrCodeImage from 'svelte-qrcode-image/QRCodeImage.svelte';

	export let data;

	let url = '';
	if (browser) {
		url = `${window.location.host}/patients/rooms/${data.number}`;
	}
</script>

<div class="flex flex-col justify-center items-center pt-5">
    <h1 class="text-4xl font-bold">Room {data.number} Belongings Tracking</h1>
	<QrCodeImage scale={10} text={url} errorCorrectionLevel="M" />
	<h1 class="text-3xl font-bold underline">{url}</h1>
</div>

<div class="border-4 border-black rounded-lg flex flex-col justify-center items-center my-4 mx-20 py-4">
    <h2 class="text-xl font-bold py-2">
        How to Use a QR Code
    </h2>
    <ol class="list-decimal">
        <li class="py-1">Open the Camera app.</li>
        <li class="py-1">Place the QR code within view of the camera.</li>
        <li class="py-1">A pop-up should appear with a link to the website.</li>
        <li class="py-1">Click on the link and follow the directions on the page.</li>
    </ol>
</div>