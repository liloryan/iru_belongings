<script>
	import { browser } from '$app/environment';
    import QrCodeImage from 'svelte-qrcode-image/QRCodeImage.svelte';

    export let data;

    let url = ""
    if (browser) {
        url = `${window.location.origin}/patients/rooms/${data.number}`
    }
</script>

<QrCodeImage text="{url}" errorCorrectionLevel="M"/>
<h3>{url}</h3>
