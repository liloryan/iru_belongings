<script>
	import { afterUpdate } from 'svelte';
	export let data;
</script>

<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl">
		<br />
		<br />{data.number} Belongings<br /> <br />
	</h1>
</div>
<div class="flex justify-center items-center">
	<h2 class="text-l">
		add the item here with a brief description <br>
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
							value="delete"
						/>
					</form>
					{#if item.checked}
						<button class="btn btn-sm btn-success" disabled={true}>verified</button>
					{:else}
						<button class="btn btn-sm btn-success" disabled={true}>unverified</button>
					{/if}
				</li>
				<div class="p-[8px]">
					<!---->
				</div>
			{/if}
		{/each}
	</ul>
</div>