<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import {goto} from "$app/navigation"
    export let data

    function pictureHandler(){
        const fileInput = document.getElementById("picture");
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

    function quantityHandler(){
        const quantity = document.getElementById("quantity").value;
        if(parseInt(quantity)<=0){
            document.getElementById('quantity_error').innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('quantity_error').innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
    }

    function pricePerKgHandler(){
        const pricePerKg = document.getElementById("price_per_kg").value;
        if(parseInt(pricePerKg)<=0){
            document.getElementById('price_per_kg_error').innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('price_per_kg_error').innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
    }

    function dateHandler(){
        const dateOfStorage = document.getElementById("date_of_storage").value;
        const dateOfExpiry = document.getElementById("date_of_expiry").value;
        if(new Date(dateOfStorage)>new Date(dateOfExpiry)){
            document.getElementById('date_error').innerHTML = "Date of expiry must be after date of storage";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('date_error').innerHTML = "";
            document.getElementById('submit').disabled = false;
        }
    }

    const formHandler = async()=>{
        const formData = new FormData();
        const type = document.getElementById("type").value;
        const quantity = document.getElementById("quantity").value;
        const pricePerKg = document.getElementById("price_per_kg").value;
        const dateOfStorage = document.getElementById("date_of_storage").value;
        const dateOfExpiry = document.getElementById("date_of_expiry").value;
        const description = document.getElementById("description").value;
        const picture = document.getElementById("picture").files[0];
        formData.append("type", type);
        formData.append("quantity", quantity);
        formData.append("price_per_kg", pricePerKg);
        formData.append("date_of_storage", dateOfStorage);
        formData.append("date_of_expiry", dateOfExpiry);
        formData.append("description", description);
        formData.append("picture", picture);
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/seller/giveAdvertisement/meat`, {
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
            <label for="Type" class="form-label">Type</label>
            <select id="type" name="type" class="form-select" aria-label=".form-select"  required>
                <option value="Rib steak">Rib steak</option>
                <option value="Rib eye steak">Rib eye steak</option>
                <option value="Tri-Trip Roast">Tri-Trip Roast</option>
                <option value="T-bone steak">T-bone steak</option>
                <option value="Rump cap">Rump cap</option>
                <option value="Round cut">Round cut</option>
                <option value="Shank Meat">Shank Meat</option>
                <option value="Flank steak">Flank steak</option>
                <option value="Short plate primal">Short plate primal</option>
                <option value="Foreshank">Foreshank</option>
                <option value="Brisket cut">Brisket cut</option>
                <option value="Beef chuck">Beef chuck</option>
            </select>
        </div>
        <div class="col-auto">
            <label for="Quantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="quantity" name="quantity" placeholder="quantity" on:input={quantityHandler} required>
        </div>
        <label for="Quantity" class="form-label" id="quantity_error" style="color: red;"></label>
        <div class="col-auto">
            <label for="Price per kg" class="form-label">Price per kg</label>
            <input type="number" class="form-control" id="price_per_kg" name="price_per_kg" placeholder="Price per kg" on:input={pricePerKgHandler} required>
        </div>
        <label for="Price per kg" class="form-label" id="price_per_kg_error" style="color: red;"></label>
        <div class="col-auto">
            <label for="Date of storage" class="form-label">Date of storage</label>
            <input type="date" class="form-control" id="date_of_storage" name="date_of_storage" placeholder="Date of storage" on:input={dateHandler} required>
        </div>
        <div class="col-auto">
            <label for="Date of expiry" class="form-label">Date of expiry</label>
            <input type="date" class="form-control" id="date_of_expiry" name="date_of_expiry" placeholder="Date of expiry" on:input={dateHandler} required>
        </div>
        <label for="Error" class="form-label" id="date_error" style="color: red;"></label>
        <div class="col-auto">
            <label for="Picture" class="form-label">Picture</label>
            <input type="file" class="form-control" id="picture" name="picture" on:input={pictureHandler} accept=".jpg, .jpeg, .png" required>
        </div>
        <div class="mb-3">
            <label for="Description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" rows="2" placeholder="Description"required></textarea>
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