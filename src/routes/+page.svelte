
<script>
    export let data
    let data1161 = {"number":1161,'verified': 10, 'unverified':4}
    let data1162 = {"number":1162,'verified': 6, 'unverified':2}
    let roomData = [data1161, data1162]
    import { goto } from '$app/navigation';
    console.log(data)

</script>

<div class="flex justify-center items-center">
	<h1 class="font-bold text-2xl"><br>Overview <br>
    <br></h1>
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
        {#each roomData as room}
            <tr class="hover hover:cursor-pointer z-0" on:click={() => goto(`/nurse/rooms/${room["number"]}`)}>
            <td>{room["number"]}</td>
            <td >{room["verified"]}</td>
            <td>{room["unverified"]}</td>
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