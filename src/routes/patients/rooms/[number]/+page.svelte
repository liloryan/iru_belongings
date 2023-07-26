<script>
	import { afterUpdate } from 'svelte';
	export let data;
	console.log(data)
	
	let newItemName = '';

	afterUpdate(() => {
		// @ts-ignore
		document.querySelector('#newItemTextArea').focus();
	});

	function addItem() {
		newItemName = newItemName.trim();
		if (!newItemName) return;

		const item = {
			text: newItemName,
			checked: false,
			id: Date.now(),
			deleted: false
		};

		roomItems = [...roomItems, item];
		newItemName = '';
	}

	/**
	 * @param {any} id
	 */
	function toggleDone(id) {
		const index = roomItems.findIndex((item) => item.id === Number(id));
		roomItems[index].checked = !roomItems[index].checked;
	}

	/**
	 * @param {any} id
	 */
	function deleteItem(id) {
		let index = roomItems.findIndex((item) => item.id == Number(id));
		roomItems[index].deletedBy = 'nurse';
		roomItems[index].deleted = true;
		console.log(roomItems);
	}
</script>

<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl">
		<br />
		<br />{data.number} Belongings<br /> <br />
	</h1>
</div>

<div class="flex justify-center items-center">
	<h2 class="text-l font-bold text-red-400">
		Don't forget to copy the deleted items list into EPIC for patient belongings management after
		discharge!<br />
		<br />
	</h2>
</div>

<div class="flex justify-center items-center p-[5px]">
	<form on:submit|preventDefault={addItem}>
		<input
			class="input input-bordered input-bg-blue-700 w-full max-w-xs"
			type="text"
			id="newItemTextArea"
			aria-label="Enter a new item to room"
			placeholder="enter item here"
			bind:value={newItemName}
		/>
	</form>
</div>

<div class="flex justify-center items-center">
	<ul class="list-disc">
		{#each data.items as item (item.id)}
			{#if !item.deleted}
				<li class="room-item">
					<label for={String(item.id)} class="list-disc" />
					<span> {item.name}</span>
					<button class="btn-xs btn-active" on:click={() => deleteItem(item.id)}>delete</button>
					{#if item.checked}
						<div
							class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-arrow-right mr-2"
							>
								<line x1="5" y1="12" x2="19" y2="12" />
								<polyline points="12 5 19 12 12 19" />
							</svg>
							verified
						</div>
					{:else}
						<div
							class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-archive mr-2"
							>
								<polyline points="21 8 21 21 3 21 3 8" />
								<rect x="1" y="3" width="22" height="5" />
								<line x1="10" y1="12" x2="14" y2="12" />
							</svg>
							unverified
						</div>
					{/if}
				</li>
				<div class="p-[5px]">
					<!---->
				</div>
			{/if}
		{/each}
	</ul>
</div>