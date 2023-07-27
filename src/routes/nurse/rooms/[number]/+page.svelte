<script>
	export let data;
</script>

<nav>
	<div class="navbar bg-base-100">
	  <div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">Home</a>
	  </div>
	</div>
  </nav>

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
	<form method="POST" action='?/create' class="flex">
		<div class="mr-2">
		<input
			class="input input-bordered input-bg-blue-700 w-full max-w-xs "
			type="text"
			aria-label="Enter a new item to room"
			placeholder="enter item here"
			name="itemName"
		/>
		<input 
			type="hidden" 
			name="roomNumber" 
			value={data.number} 
		/>
		</div>
		<input
			class="btn btn-success"
			type="submit"
			value="Add"
		/>
	</form>
</div>
<div class="p-[8px]">
	</div>
<div class="flex justify-center items-center">
	<ul class="item-list">
		{#each data.items as item (item.id)}
			{#if !item.deleted}
				<li class="list-disc">
					<span> {item.name}</span>
					<form method="POST" action="?/remove" class="inline">
						<input 
							type="hidden" 
							name="id" 
							value={item.id} 
						/>
						<input 
							class="btn btn-outline btn-xs btn-error btn-active"
							type="submit"
							value="remove"
						/>
					</form>
					{#if item.checked}
						<button class="btn btn-sm btn-success" disabled={true}>verified</button>
					{:else}
						<form method="POST" action="?/check" class="inline"> 
							<input 
								type="hidden" 
								name="id" 
								value={item.id} 
							/>
							<input
								class="btn btn-sm btn-warning"
								type="submit"
								value="verify"
							/>
						</form>
					{/if}
				</li>
				<div class="p-[8px]">
					<!---->
				</div>
			{/if}
		{/each}
	</ul>
</div>

<div class="flex justify-center items-center">
	<h2 class="font-bold text-xl">
		<br />
		<br />Deleted Belongings
	</h2>
</div>

<div class="flex justify-center items-center p-[5px]">
	<ul class="item-list">
		{#each data.items as delItem (delItem.id)}
			{#if delItem.deleted}
				<li class="list-disc">
					<label for={String(delItem.id)} class="tick" />
					<span> {delItem.name}</span>
					{#if delItem.checked}
						<button class="btn btn-sm btn-success" disabled={true}>verified</button>
					{:else}
					<button class="btn btn-sm btn-error" disabled={true}>unverified</button>
					{/if}
					{#if delItem.deleter == "nurse"}
						<div class="badge badge-success">NURSE DELETED</div>
					{:else}
						<div class="badge badge-error">PATIENT DELETED</div>
					{/if}
				</li>
				<div class="p-[8px]" />
			{/if}
		{/each}
	</ul>
</div>