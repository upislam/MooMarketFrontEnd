<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import {goto} from "$app/navigation"
    import {user_val} from "../stores/user_val.js";

    var phone_number="";
    var password="";
    
    const postData = async () => {
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phone_number,
                    password: password
                })
            });
            const data = await response.json();
            if (data.success) {
                swal({
                    title: "Success!",
                    text: data.message,
                });
                user_val.set(true);
                await goto("/", { replaceState: false, noScroll: false });
            } else {
                user_val.set(false);
                swal({
                    title: "Failed!",
                    text: data.message,
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

</script>

<div class="container">
    <form class="col g-3" on:submit|preventDefault={postData}>
        <div class="col-auto">
          <label for="Phone number" class="form-label">Phone number</label>
          <input type="number" class="form-control" bind:value={phone_number} id="phone_number" name="phone_number" placeholder="phone number" required>
        </div>
        <div class="col-auto">
            <label for="inputPassword2" class="form-label">Password</label>
            <input type="password" class="form-control" bind:value={password} id="password" name="password" placeholder="Password" required>
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">Login</button>
        </div>
        <div class="col-auto">
          <a href="/forgetPassword">Forgot Password</a>
      </div>
    </form>
</div>

<style type="text/css">
    .container {
        display: flex;
        justify-content: center;
        /* align-items: center; */
        height: 100vh;
    }
</style>