<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import {goto} from "$app/navigation"
    var msg=""
    const formHandler = async () => {
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/login/forgetPassword`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: document.getElementById("phone_number").value
                })
            });
            const data = await response.json();
            msg=data.message
            if (data.success) {
                swal({
                    title: "Success!",
                    text: data.message,
                });
            } else {
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
    <form class="col g-3" on:submit|preventDefault={formHandler}>
        <div class="col-auto">
          <label for="Phone number" class="form-label">Phone number</label>
          <input type="number" class="form-control" id="phone_number" name="phone_number" placeholder="phone number" required>
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">Send Email</button>
        </div>
    </form>

    <div class="container">
        <a href="/"> Go to home page</a>
    </div>
    <div class="container">
        <p>{msg}</p>
    </div>
</div>