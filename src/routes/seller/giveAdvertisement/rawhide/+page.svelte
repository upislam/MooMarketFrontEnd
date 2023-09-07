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

    function sellingPricePerPieceHandler(){
        const pricePerKg = document.getElementById("selling_price_per_piece").value;
        if(parseInt(pricePerKg)<=0){
            document.getElementById('selling_price_per_piece_error').innerHTML = "It must be a positive number";
            document.getElementById('submit').disabled = true;
        }
        else{
            document.getElementById('selling_price_per_piece_error').innerHTML = "";
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
        const preservation_style = document.getElementById("preservation_style").value;
        const quantity = document.getElementById("quantity").value;
        const selling_price_per_piece = document.getElementById("selling_price_per_piece").value;
        const date_of_storage = document.getElementById("date_of_storage").value;
        const date_of_expiry = document.getElementById("date_of_expiry").value;
        const description = document.getElementById("description").value;
        const picture = document.getElementById("picture").files[0];
        formData.append('preservation_style', preservation_style);
        formData.append('quantity', quantity);
        formData.append('selling_price_per_piece', selling_price_per_piece);
        formData.append('date_of_storage', date_of_storage);
        formData.append('date_of_expiry', date_of_expiry);
        formData.append('description', description);
        formData.append('picture', picture);
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/seller/giveAdvertisement/rawhide`, {
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
            <input type="number" class="form-control" id="quantity" name="quantity" placeholder="quantity" on:input={quantityHandler} required>
        </div>
        <label for="Quantity" class="form-label" id="quantity_error" style="color: red;"></label>
        <div class="col-auto">
            <label for="Preservation style" class="form-label">Preservation style</label>
            <select id="preservation_style" name="preservation_style" class="form-select" aria-label=".form-select"  required>
                <option value="salted">Salted</option>
                <option value="dried">Dried</option>
            </select>
        </div>
        <div class="col-auto">
            <label for="Selling price per piece" class="form-label">Selling price per piece</label>
            <input type="number" class="form-control" id="selling_price_per_piece" name="selling_price_per_piece" placeholder="Selling price per piece" on:input={sellingPricePerPieceHandler} required>
        </div>
        <label for="Selling price per piece" class="form-label" id="selling_price_per_piece_error" style="color: red;"></label>
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