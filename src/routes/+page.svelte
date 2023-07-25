<nav>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="/">Home</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/nurse/[slug]/1161">1161</a></li>
        <li><a href="/nurse/[slug]/1162">1162</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="flex justify-center items-center">
<h1 class="font-bold text-2xl">Room Management<br>
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
    <li class="list-disc">
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