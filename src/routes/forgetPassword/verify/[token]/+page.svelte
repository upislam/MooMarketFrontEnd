<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    export let data
    $: response = data.params;
    console.log(response);
</script>

<div class="container">
    <h1>Success!</h1>
    <p>{response.message}</p>
</div>
<div class="container">
    <a href="/"> Go to home page</a>
    <a href="/login"> Go to login page</a>
</div>