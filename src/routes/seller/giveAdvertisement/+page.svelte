<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import {goto} from "$app/navigation";
    export let data
    var type;
    const formHandler = async ()=>{
        await goto(`/seller/giveAdvertisement/${type}`, { replaceState: false, noScroll: false });
    }
</script>

{#if (data.auth.success)}
    <div class="container">
        <form class="col g-3" on:submit|preventDefault={formHandler}>
            <div class="col-auto">
                <label for="Type" class="form-label">Type</label>
                <select bind:value={type} id="type" name="type" class="form-select" aria-label=".form-select"  required>
                    <option value="meat">Meat</option>
                    <option value="cattle">Cattle</option>
                    <option value="rawhide">Rawhide</option>
                    <option value="horn">Horn</option>
                    <option value="hoof">Hoof</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Submit</button>
            </div>
        </form>
    </div>
{:else}
    <div class="container">
        <h1>{data.auth.message}</h1>
    </div>
{/if}