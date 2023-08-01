<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { printExternal } from '$lib/print';
	export let data;

	/**
	 * @type {HTMLDialogElement}
	 */
	let modal;
	let roomToDelete = -1;
</script>

<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl">
		<br />Overview <br />
		<br />
	</h1>
</div>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Room</th>
				<th>Verified Items</th>
				<th>Unverified Items</th>
				<th>Clear Room</th>
				<th>Print QR code</th>
			</tr>
		</thead>
		<tbody>
			{#each data.rooms as room}
				<tr
					class="hover hover:cursor-pointer"
					on:click={() => goto(`/nurse/rooms/${room['number']}`)}
				>
					<td>{room['number']}</td>
					<td>{room['verified']}</td>
					<td class="text-red-400 font-bold">{room['unverified']}</td>
					<td on:click|stopPropagation>
						<button
							class="btn btn-error"
							on:click|stopPropagation={() => {
								roomToDelete = Number(room['number']);
								modal.showModal();
							}}>Clear</button
						>
					</td>
					<td on:click|stopPropagation>
						<button
							class="btn btn-warning"
							on:click|stopPropagation={() => printExternal(`rooms/${room['number']}`)}
							><Icon icon="solar:printer-broken" height="35" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dialog bind:this={modal} class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Do you want to clear room {roomToDelete}?</h3>
		<p class="py-4">Press ESC key or click outside to close</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<form method="POST" action="?/delItems" class="inline">
				<input type="hidden" name="roomToDelete" value={roomToDelete} />
				<input class="btn btn-error" type="submit" value="clear" />
			</form>
			<button class="btn btn-warning">cancel</button>
		</div>
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
