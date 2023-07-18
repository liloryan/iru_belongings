<!-- <h1>Room Management <br/> 
<br/> </h1>
<form method="POST">
	<label>
		add an item to room:
		<input 
			name="description"
			autocomplete="off"
		/>
	</label>
</form>
-->
<h1>Room Management<br>
<br> </h1>
<script>
let roomItems = [];
let newItem = '';

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
</script>

<form on:submit|preventDefault={addItem}>
  <input class="js-item-input" type="text" aria-label="Enter a new item to room" placeholder="enter item here" bind:value={newItem}>
</form>

<ul class = "item-list">
  {#each roomItems as item (item.id)}
    <li class = "room-item">
      <input id = {item.id} type = "checkbox" />
      <label for {item.id} class = "tick"> </label>
      <span> {item.text}</span>
      <button type = "delete-item">
        <svg><use href = "#delete.svg"></use></svg>
      </button>
    </li>
  {/each}
</ul>
