<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl">1161 Belongings<br>
	<br> </h1>
	</div>
	<script>
	import { afterUpdate } from "svelte";
	
	/**
		 * @type {any[]}
		 */
	let roomItems = [];
	let newItem = '';
	
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