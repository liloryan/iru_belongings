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
<main>
    <div class="container">
      <h1 class="app-title">todos</h1>
      <ul class="Patient Belongings"></ul>
      <div class="empty-state">
        <h2 class="empty-state__title">Add your first item to room</h2>
        <p class="empty-state__description">Add a new item here.</p>
      </div>
      <form>
        <input class="js-belongings-input" type="text" aria-label="Enter a new item to room" placeholder="E.g. Build a web app" />
      </form>
    </div>
  </main>
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

function toggleDone(id) {
  const index = roomItems.findIndex(item => item.id === Number(id));
  roomItems[index].checked = !roomItems[index].checked;
}

function deleteItem(id) {
  roomItems = roomItems.filter(item => item.id !== Number(id));
}

</script>

<form on:submit|preventDefault={addItem}>
  <input class="js-item-input" type="text" aria-label="Enter a new item to room" placeholder="enter item here" bind:value={newItem}>
</form>

<ul class="item-list">
  {#each roomItems as item (item.id)}
    <li class="room-item">
      <input id={item.id} type = "checkbox" />
      <label for={item.id} class = "tick"> </label>
      <span> {item.text}</span>
      <button class="btn btn-active" on:click={() => deleteItem(item.id)}>delete</button>
    </li>
  {/each}
</ul>
