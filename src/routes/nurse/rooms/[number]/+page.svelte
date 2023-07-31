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
	<h1 class="font-bold text-2xl pt-2">
		{data.number} Belongings
	</h1>
</div>
<div class="px-10 justify-center flex">
	<h2 class="text-l font-bold text-red-400 py-10">
		Don't forget to copy the deleted items list into EPIC for patient belongings management after
		discharge!
	</h2>
</div>

<div class="flex justify-center items-center p-[5px]">
	<form method="POST" action="?/create" class="flex">
		<div class="mr-2">
			<input
				class="input input-bordered input-bg-blue-700 w-full max-w-xs"
				type="text"
				aria-label="Enter a new item to room"
				placeholder="enter item here"
				name="itemName"
			/>
			<input type="hidden" name="roomNumber" value={data.number} />
		</div>
		<input class="btn btn-success" type="submit" value="Add" />
	</form>
</div>

<div class="p-[8px]" />

<div class="px-10">
	<table class="table">
		<thead>
			<tr>
				<th>Item</th>
				<th>Status</th>
				<th>Remove</th>
			</tr>
		</thead>
		<tbody>
			{#each data.items as item (item.id)}
				{#if !item.deleted}
					<tr>
						<td> {item.name}</td>
						<td>
							{#if item.checked}
								<button class="btn btn-sm btn-success" disabled={true}>verified</button>
							{:else}
								<form method="POST" action="?/check" class="inline">
									<input type="hidden" name="id" value={item.id} />
									<input class="btn btn-sm btn-warning" type="submit" value="verify" />
								</form>
							{/if}
						</td>
						<td>
							<form method="POST" action="?/remove" class="inline">
								<input type="hidden" name="id" value={item.id} />
								<input
									class="btn btn-outline btn-xs btn-error btn-active"
									type="submit"
									value="remove"
								/>
							</form>
						</td>
					</tr>
					<div class="p-[8px]">
						<!---->
					</div>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<div class="flex justify-center items-center">
	<h2 class="font-bold text-xl py-10">Deleted Belongings</h2>
</div>

<div class="px-10">
	<table class="table">
		<thead>
			<th>Item</th>
			<th>Status</th>
			<th>Deleted by</th>
			<th>Deleted date</th>
		</thead>
		<tbody>
		{#each data.items as delItem (delItem.id)}
			{#if delItem.deleted}
				<tr>
					<td>{delItem.name}</td>
					<td>
					{#if delItem.checked}
						<button class="btn btn-sm btn-success" disabled={true}>verified</button>
					{:else}
						<button class="btn btn-sm btn-error" disabled={true}>unverified</button>
					{/if}
					</td>
					<td>
					{#if delItem.deleter == 'nurse'}
						<div class="badge badge-success font-bold">NURSE DELETED</div>
					{:else}
						<div class="badge badge-error font-bold">PATIENT DELETED</div>
					{/if}
					</td>
					<td>
						{delItem.deletedDate?.toLocaleString()}
					</td>
				</tr>
				<div class="p-[8px]" />
			{/if}
		{/each}
	</tbody>
	</table>
</div>
