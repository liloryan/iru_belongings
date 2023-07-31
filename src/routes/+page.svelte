<script>
	export let data;
	import { goto } from '$app/navigation';
</script>

<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl">
		<br />Overview <br />
		<br />
	</h1>
</div>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Room</th>
				<th>Verified Items</th>
				<th>Unverified Items</th>
				<th>Clear Room</th>
			</tr>
		</thead>
		<tbody>
			{#each data.rooms as room}
				<tr
					class="hover hover:cursor-pointer"
					on:click={() => goto(`/nurse/rooms/${room['number']}`)}
				>
					<td>{room['number']}</td>
					<td>{room['verified']}</td>
					<td class="text-red-400 font-bold">{room['unverified']}</td>
          <td>
            <button class="btn btn-error" on:click|stopPropagation>Test</button>
          </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!--
    modal
    <button className="btn" onClick={()=>window.my_modal_1.showModal()}>open modal</button>
                <dialog id="my_modal_1" className="modal">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </div>
                  </form>
                </dialog>
-->
