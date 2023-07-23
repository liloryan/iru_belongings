<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl"><br>
		<br>1161 Belongings<br>
	<br> </h1>
	</div>
	<script>
	import { afterUpdate } from "svelte";
	
	/**
		 * @type {any[]}
		 */
	let roomItems = [];
	let newItem = '';
	/**
	 * @type {any[]}
	 */
	let deletedItems = [];
	
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
		const deletedItem = roomItems.find(item => item.id == Number(id));
		deletedItems = [...deletedItems, deletedItem];
		roomItems = roomItems.filter(item => item.id !== Number(id));
	}
	</script>

	<div class="flex justify-center items-center p-[5px]">
	<form on:submit|preventDefault={addItem}>
	  <input class="input input-bordered input-primary w-full max-w-xs" type="text" id="newItemTextArea" aria-label="Enter a new item to room" placeholder="enter item here" bind:value={newItem}>
	</form>
	</div>
	
	<div class="flex justify-center items-center">
	<ul class="item-list">
	  {#each roomItems as item (item.id)}
		<li class="room-item">
		  <input id={item.id} type = "checkbox" />
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
		<li class="room-item">
		  <input id={delItem.id} type = "checkbox" />
		  <label for={delItem.id} class = "tick"> </label>
		  <span> {delItem.text}</span>
		</li>
		<div class="p-[5px]">
		  <!---->
		</div>
		
	  {/each}
	</ul>
</div>