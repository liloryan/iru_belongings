<script>
	import { afterUpdate } from "svelte";
	export let data;
	/**
		 * @type {any[]}
		 */
	let roomItems = [];
	let newItem = '';
	/**
	 * @type {any[]}
	 */
	let deletedItems = [];
	let itemOne = {'itemName':'shirt','checked by nurse':'False'}
	let itemTwo = {'itemName':'phone','checked by nurse':'True'}
	let testItems = [itemOne, itemTwo]
	
	afterUpdate(() => {
	  // @ts-ignore
	  document.querySelector('#newItemTextArea').focus();
	})
	
	function addItem() {
	  newItem = newItem.trim();
	  if (!newItem) return;
	
	  const item = {
		  text: newItem,
		  checked: false,
		  id: Date.now(),
	  };
	
	  roomItems = [...roomItems, item];
	  newItem = '';
	}
	
	/**
	 * @param {any} id
	 */
	function toggleDone(id) {
	  const index = roomItems.findIndex(item => item.id === Number(id));
	  roomItems[index].checked = !roomItems[index].checked;
	}
	
	/**
	 * @param {any} id
	 */
	function deleteItem(id) {
		let deletedItem = roomItems.find(item => item.id == Number(id));
		deletedItem.deletedBy = 'nurse'
		deletedItems = [...deletedItems, deletedItem];
		roomItems = roomItems.filter(item => item.id !== Number(id));
	}
</script>

	<div class="flex justify-center items-center">
		<h1 class="font-bold text-2xl"><br>
			<br>1161 Belongings<br> <br></h1>
		</div>
	<div class="flex justify-center items-center"> 
		<h2 class="text-l font-bold text-red-400">Don't forget to copy the deleted items list into EPIC for patient belongings management after discharge!<br>
		<br></h2>
		</div>

	<div class="flex justify-center items-center p-[5px]">
	<form on:submit|preventDefault={addItem}>
	  <input class="input input-bordered input-bg-blue-700 w-full max-w-xs" type="text" id="newItemTextArea" aria-label="Enter a new item to room" placeholder="enter item here" bind:value={newItem}>
	</form>
	</div>
	
	<div class="flex justify-center items-center">
	<ul class="item-list">
	  {#each roomItems as item (item.id)}
		<li class="room-item">
		  <input id={item.id} type = "checkbox" />
		  <label for={item.id} class = "tick"> </label>
		  <span> {item.text}</span>
		  <button class="btn-xs btn-active" on:click={() => deleteItem(item.id)}>delete</button>
		</li>
		<div class="p-[5px]">
		  <!---->
		</div>
		
	  {/each}
	</ul>
	</div>

<div class="flex justify-center items-center">
	<h2 class="font-bold text-xl"><br>
	<br>Deleted Belongings</h2>
</div>

<div class="flex justify-center items-center p-[5px]">
	<ul class="item-list">
	  {#each deletedItems as delItem (delItem.id)}
		{#if delItem.deletedBy = "nurse"}
		<li class="list-disc">
		  <label for={delItem.id} class = "tick"> </label>
		  <span> {delItem.text}</span>
		  <div
		  class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
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
			class="feather feather-arrow-right mr-2">
			<line x1="5" y1="12" x2="19" y2="12"></line>
			<polyline points="12 5 19 12 12 19"></polyline>
		  </svg>
		  checked
		</div>
		</li>
		<div class="p-[5px]">
		  <!---->
		</div>
		{:else}
		<li class="list-disc">
			<label for={delItem.id} class = "tick"> </label>
			<span> {delItem.text}</span>
			<div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
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
				  <polyline points="21 8 21 21 3 21 3 8"></polyline>
				  <rect x="1" y="3" width="22" height="5"></rect>
				  <line x1="10" y1="12" x2="14" y2="12"></line>
				</svg>
				not checked
				</div>
		  </li>
		  <div class="p-[5px]">
			<!---->
		  </div>
		  {/if}
	  {/each}
	</ul>
</div>
