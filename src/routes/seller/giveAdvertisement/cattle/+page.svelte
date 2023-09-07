<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import {goto} from "$app/navigation"
    export let data
    var quantity=1;
    var numbers = Array.from({ length: quantity }, (_, i) => i + 1);
    function quantityHandler(){
        const quantity = document.getElementById("quantity").value;
        if(parseInt(quantity)<=0){
            document.getElementById('quantity_error').innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
            return;
        }
        else{
            numbers = Array.from({ length: quantity }, (_, i) => i + 1);
            document.getElementById('quantity_error').innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
        
        // document.getElementById('parent').innerHTML = "";
        // for(let i=0;i<parseInt(quantity);i++){
        //     document.getElementById('parent').innerHTML += `
        //     <h2 style="text-align:center">Cattle ${i+1}</h2>
        //     <div class="col-auto">
        //     <label for="age" class="form-label">Age</label>
        //     <input type="number" class="form-control" id="age${i}" name="age${i}" placeholder="Age" oninput="ageHandler(${i})"  required>
        //     </div>
        //     <label for="Quantity" class="form-label" id="age_error${i}" style="color: red;"></label>
        //     <div class="col-auto">
        //     <label for="Color" class="form-label">Color</label>
        //     <input type="text" class="form-control" id="color" name="color${i}" placeholder="Color" required>
        //     </div>
        //     <div class="col-auto">
        //     <label for="weight" class="form-label">Weight</label>
        //     <input type="number" class="form-control" id="weight${i}" name="weight${i}" placeholder="Weight" oninput="weightHandler(${i})"  required>
        //     </div>
        //     <label for="Quantity" class="form-label" id="weight_error${i}" style="color: red;"></label>
        //     <div class="col-auto">
        //     <label for="Type" class="form-label">Gender</label>
        //     <select id="gender" name="gender${i}" class="form-select" aria-label=".form-select"  required>
        //         <option value="male">male</option>
        //         <option value="female">female</option>
        //     </select>
        // </div>
        // <div class="col-auto">
        //     <label for="Type" class="form-label">Veterinary verified?</label>
        //     <select id="veterinary_verified${i}" name="veterinary_verified${i}" class="form-select" aria-label=".form-select"  required>
        //         <option value="yes">Yes</option>
        //         <option value="no">No</option>
        //     </select>
        // </div>
        // <div class="col-auto">
        // <label for="Picture" class="form-label">Picture front view</label>
        // <input type="file" class="form-control" id="picture_front_view" name="picture_front_view" oninput="pictureFrontHandler(${i})" required>
        // </div>
        // <div class="col-auto">
        // <label for="Picture" class="form-label">Picture left view</label>
        // <input type="file" class="form-control" id="picture_left_view" name="picture_left_view" oninput="pictureLeftHandler(${i})" required>
        // </div>
        // <div class="col-auto">
        // <label for="Picture" class="form-label">Picture right view</label>
        // <input type="file" class="form-control" id="picture_right_view" name="picture_right_view" oninput="pictureRightHandler(${i})" required>
        // </div>
        // <div class="col-auto">
        // <label for="Picture" class="form-label">Picture back view</label>
        // <input type="file" class="form-control" id="picture_back_view" name="picture_back_view" oninput="pictureBackHandler(${i})" required>
        // </div>
        // <div class="col-auto">
        // <label for="video" class="form-label">Video</label>
        // <input type="file" class="form-control" id="video" name="video" oninput="videoHandler(${i})" required>
        // </div>`;
        // }
    }

    function priceHandler(){
        const price = document.getElementById("price").value;
        if(parseInt(price)<=0){
            document.getElementById('price_error').innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('price_error').innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
    }

    function ageHandler(id){
        const age = document.getElementById("age"+id).value;
        if(parseInt(age)<=0){
            document.getElementById('age_error'+id).innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('age_error'+id).innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
    }

    function weightHandler(id){
        const weight = document.getElementById("weight"+id).value;
        if(parseInt(weight)<=0){
            document.getElementById('weight_error'+id).innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('weight_error'+id).innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
    }


    function pictureFrontHandler(id){
        var elements = document.querySelectorAll('#picture_front_view');
        var fileInput = elements[id];
        const fileName = fileInput.value.toLowerCase();

        if (!fileName.endsWith(".png")&&!fileName.endsWith(".jpg")&&!fileName.endsWith(".jpeg")) {
            swal({
                title: "Wrong file type!",
                text: "You have to upload a png/jpg/jpeg file!",
            });
            fileInput.value = "";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('submit').disabled = false;
        }
    }

    function pictureLeftHandler(id){
        var elements = document.querySelectorAll('#picture_left_view');
        var fileInput = elements[id];
        const fileName = fileInput.value.toLowerCase();

        if (!fileName.endsWith(".png")&&!fileName.endsWith(".jpg")&&!fileName.endsWith(".jpeg")) {
            swal({
                title: "Wrong file type!",
                text: "You have to upload a png/jpg/jpeg file!",
            });
            fileInput.value = "";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('submit').disabled = false;
        }
    }

    function pictureRightHandler(id){
        var elements = document.querySelectorAll('#picture_right_view');
        var fileInput = elements[id];
        const fileName = fileInput.value.toLowerCase();

        if (!fileName.endsWith(".png")&&!fileName.endsWith(".jpg")&&!fileName.endsWith(".jpeg")) {
            swal({
                title: "Wrong file type!",
                text: "You have to upload a png/jpg/jpeg file!",
            });
            fileInput.value = "";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('submit').disabled = false;
        }
    }

    function pictureBackHandler(id){
        var elements = document.querySelectorAll('#picture_back_view');
        var fileInput = elements[id];
        const fileName = fileInput.value.toLowerCase();

        if (!fileName.endsWith(".png")&&!fileName.endsWith(".jpg")&&!fileName.endsWith(".jpeg")) {
            swal({
                title: "Wrong file type!",
                text: "You have to upload a png/jpg/jpeg file!",
            });
            fileInput.value = "";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('submit').disabled = false;
        }
    }

    function videoHandler(id){
        var elements = document.querySelectorAll('#video');
        var fileInput = elements[id];
        const fileName = fileInput.value.toLowerCase();

        if (!fileName.endsWith(".mp4")) {
            swal({
                title: "Wrong file type!",
                text: "You have to upload a mp4 file!",
            });
            fileInput.value = "";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('submit').disabled = false;
        }
    }

//     onMount(() => {
//         document.getElementById("quantity").value=0;
//   });
    const formHandler = async()=>{
        const formData = new FormData();
        const quant = document.getElementById("quantity").value;
        const price = document.getElementById("price").value;
        const farmName = document.getElementById("farm_name").value;
        const description = document.getElementById("description").value;
        const bidding = document.getElementById("bidding").value;
        formData.append('quantity', quant);
        formData.append('price', price);
        formData.append('farm_name', farmName);
        formData.append('description', description);
        formData.append('bidding', bidding);
        for(let i=0;i<quantity;i++){
            formData.append(`age${i}`, document.getElementById(`age${i}`).value);
        }
        for(let i=0;i<quantity;i++){
            formData.append(`color${i}`, document.getElementById(`color${i}`).value);
        }
        for(let i=0;i<quantity;i++){
            formData.append(`weight${i}`, document.getElementById(`weight${i}`).value);
        }
        for(let i=0;i<quantity;i++){
            formData.append(`gender${i}`, document.getElementById(`gender${i}`).value);
        }
        for(let i=0;i<quantity;i++){
            formData.append(`veterinary_verified${i}`, document.getElementById(`veterinary_verified${i}`).value);
        }
        var files
        files = document.querySelectorAll('#picture_front_view');
        files.forEach((element) => {
            formData.append('picture_front_view',element.files[0]);
        });
        files = document.querySelectorAll('#picture_left_view');
        files.forEach((element) => {
            formData.append('picture_left_view',element.files[0]);
        });
        files = document.querySelectorAll('#picture_right_view');
        files.forEach((element) => {
            formData.append('picture_right_view',element.files[0]);
        });
        files = document.querySelectorAll('#picture_back_view');
        files.forEach((element) => {
            formData.append('picture_back_view',element.files[0]);
        });
        files = document.querySelectorAll('#video');
        files.forEach((element) => {
            formData.append('video',element.files[0]);
        });
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/seller/giveAdvertisement/cattle`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                swal({
                    title: "Success!",
                    text: data.message,
                });
                await goto("/seller/giveAdvertisement/confirm", { replaceState: false, noScroll: false });
            } else {
                swal({
                    title: "Failed!",
                    text: data.message,
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

{#if (data.auth.success)}
<div class="container">
    <form class="col g-3" on:submit|preventDefault={formHandler} enctype="multipart/form-data">
      <div class="col-auto">
        <label for="Quantity" class="form-label">Quantity</label>
        <input type="number" class="form-control" id="quantity" name="quantity" bind:value={quantity}  on:input={quantityHandler} required>
      </div>
      <label for="Quantity" class="form-label" id="quantity_error" style="color: red;"></label>
      <div class="col-auto">
        <label for="Price" class="form-label">Total price</label>
        <input type="number" class="form-control" id="price" name="price" placeholder="Price" on:input={priceHandler} required>
      </div>
      <label for="Quantity" class="form-label" id="price_error" style="color: red;"></label>
      <div class="col-auto">
        <label for="Farm name" class="form-label">Farm name</label>
        <input type="text" class="form-control" id="farm_name" name="farm_name" placeholder="Farm name" required>
      </div>
      <div class="mb-3">
        <label for="Description" class="form-label">Description</label>
        <textarea class="form-control" id="description" name="description" rows="2" placeholder="Description" required></textarea>
      </div>
      <div class="col-auto">
        <label for="Type" class="form-label">Bidding?</label>
        <select id="bidding" name="bidding" class="form-select" aria-label=".form-select"  required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
      </div>
      <div id="parent">
        {#each numbers as number}
        <h2 style="text-align:center">Cattle {number}</h2>
        <div class="col-auto">
          <label for="age" class="form-label">Age</label>
          <input type="number" class="form-control" id="age{number-1}" name="age{number-1}" placeholder="Age" on:input={()=>ageHandler(number-1)} required>
        </div>
        <label for="Quantity" class="form-label" id="age_error{number-1}" style="color: red;"></label>
        <div class="col-auto">
          <label for="Color" class="form-label">Color</label>
          <input type="text" class="form-control" id="color{number-1}" name="color{number-1}" placeholder="Color" required>
        </div>
        <div class="col-auto">
          <label for="weight" class="form-label">Weight</label>
          <input type="number" class="form-control" id="weight{number-1}" name="weight{number-1}" placeholder="Weight" on:input={()=>weightHandler(number-1)} required>
        </div>
        <label for="Quantity" class="form-label" id="weight_error{number-1}" style="color: red;"></label>
        <div class="col-auto">
          <label for="Type" class="form-label">Gender</label>
          <select id="gender{number-1}" name="gender{number-1}" class="form-select" aria-label=".form-select"  required>
              <option value="male">male</option>
              <option value="female">female</option>
          </select>
      </div>
      <div class="col-auto">
        <label for="Type" class="form-label">Veterinary verified?</label>
        <select id="veterinary_verified{number-1}" name="veterinary_verified{number-1}" class="form-select" aria-label=".form-select"  required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
      </div>
        <div class="col-auto">
          <label for="Picture" class="form-label">Picture front view</label>
          <input type="file" class="form-control" id="picture_front_view" name="picture_front_view" on:input={()=>pictureFrontHandler(number-1)} accept=".jpg, .jpeg, .png"  required>
        </div>
        <div class="col-auto">
          <label for="Picture" class="form-label">Picture left view</label>
          <input type="file" class="form-control" id="picture_left_view" name="picture_left_view" on:input={()=>pictureLeftHandler(number-1)} accept=".jpg, .jpeg, .png"  required>
        </div>
        <div class="col-auto">
          <label for="Picture" class="form-label">Picture right view</label>
          <input type="file" class="form-control" id="picture_right_view" name="picture_right_view" on:input={()=>pictureRightHandler(number-1)} accept=".jpg, .jpeg, .png"  required>
        </div>
        <div class="col-auto">
          <label for="Picture" class="form-label">Picture back view</label>
          <input type="file" class="form-control" id="picture_back_view" name="picture_back_view" on:input={()=>pictureBackHandler(number-1)} accept=".jpg, .jpeg, .png"  required>
        </div>
        <div class="col-auto">
          <label for="video" class="form-label">Video</label>
          <input type="file" class="form-control" id="video" name="video" on:input={()=>videoHandler(number-1)} accept=".mp4"  required>
        </div>
        {/each}
      </div>
      <div class="col-auto">
          <button id="submit" type="submit" class="btn btn-primary mb-3" disabled>Submit</button>
      </div>
    </form>
</div>
{:else}
    <div class="container">
        <h1>{data.auth.message}</h1>
    </div>
{/if}