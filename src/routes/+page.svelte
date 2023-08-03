<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { printExternal } from '$lib/print';
	import {enhance} from '$app/forms';
	export let data;
	export let form;

	/**
	 * @type {HTMLDialogElement}
	 */
	let clearModal;
	/**
	 * @type {HTMLDialogElement}
	 */
	let delModal;
	/**
	 * @type {HTMLDialogElement}
	 */
	let createModal;
	let roomToClear = -1;
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
				<th>Delete Room</th>
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
								roomToClear = Number(room['number']);
								clearModal.showModal();
							}}>Clear</button
						>
					</td>
					<td on:click|stopPropagation>
						<button
							class="btn btn-warning"
							on:click|stopPropagation={() => printExternal(`rooms/${room['number']}`)}
						>
							<Icon icon="solar:printer-broken" height="35" />
						</button>
					</td>
					<td on:click|stopPropagation>
						<button
							class="btn"
							on:click|stopPropagation={() => {
								roomToDelete = Number(room['number']);
								delModal.showModal();
							}}
						>
							<Icon icon="ph:trash-bold" height="30" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<button
	class="btn btn-success m-10"
	on:click={() => {
		createModal.showModal();
	}}
>
	add room
</button>

<dialog bind:this={clearModal} class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Do you want to clear room {roomToClear}?</h3>
		<p class="py-4">Press ESC key or click outside to close</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<form method="POST" action="?/delItems" class="inline" use:enhance>
				<input type="hidden" name="roomToClear" value={roomToClear} />
				<input class="btn btn-error" type="submit" value="clear" />
			</form>
			<button class="btn btn-warning">cancel</button>
		</div>
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog bind:this={delModal} class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Do you want to delete room {roomToDelete}?</h3>
		<p class="py-4">Press ESC key or click outside to close</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<form method="POST" action="?/delRoom" class="inline" use:enhance>
				<input type="hidden" name="roomToDelete" value={roomToDelete} />
				<input class="btn btn-error" type="submit" value="delete" />
			</form>
			<button class="btn btn-warning">cancel</button>
		</div>
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog bind:this={createModal} class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Add room</h3>
		<p class="py-4">Press ESC key or click outside to close</p>

		<!-- if there is a button in form, it will close the modal -->
		<form method="POST" action="?/createRoom" class="inline" use:enhance>
			<input
				class="input input-bordered input-bg-blue-700 w-full max-w-xs"
				type="number"
				aria-label="Enter a new item to room"
				placeholder="enter item here"
				name="roomToCreate"
				required
			/>
			{#if form?.error}
				<p class="text-red-600">{form.error}</p>
			{/if}
			<div class="modal-action">
				<input class="btn btn-error" type="submit" value="delete" />
				<button class="btn btn-warning" on:click|preventDefault={() => createModal.close()}
					>cancel</button
				>
			</div>
		</form>
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
