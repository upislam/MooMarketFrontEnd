<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import {goto} from "$app/navigation";
    import { onMount } from 'svelte';
    import {user_val} from "./stores/user_val.js";
  
    export let data
    
    $: isLoggedIn = data.auth? true: false;

    const logout = async () => {
        try {
            const response = await fetch(`https://moomarket-dlki.onrender.com/api/logout`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
              isLoggedIn = false;
              user_val.set(false);
                swal({
                    title: "Logout!",
                    text: data.message,
                });
            } else {
              isLoggedIn = true;
              user_val.set(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
</script>

<div class="background-image"></div>
    <div class="black-box"></div>
    <div class="third-image"></div>
    <div class="logo">
      <img src="/pictures/373454364_260518726818122_6762046698104647155_n.png" alt="Image Description" width="120" height="70" />
    </div>
    <div class="content">
      <h1>Welcome to My Webpage</h1>
      <p>This is a simple webpage with a full-page background image.</p>
    </div>

    <div class="container">
      <h1>Welcome to MooMarket</h1>
    </div>

    <div class="container">
        {#if (!isLoggedIn)}
            <a href="/login" class="button"><button class="btn btn-primary">Login</button></a>
            <a href="/buyerRegister" class="button"><button class="btn btn-primary">Register</button></a>
            <a href="/coordinates" class="button"><button class="btn btn-primary">Coordinates</button></a>
        {:else}
          {#if (data && data.auth.type == 'seller')}
            <a href="/seller/giveAdvertisement" class="button"><button class="btn btn-primary">Give Advertisement</button></a>
          {/if}
            <button on:click={logout} class="btn btn-primary">Logout</button>
        {/if}
    </div>
<div class="footer">
    <footer class="bg-dark text-center text-white">
      <!-- Grid container -->
      <div class="container p-4 pb-0">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Facebook -->
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
            ><i class="fab fa-facebook-f"></i
          ></a>

          <!-- Twitter -->
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
            ><i class="fab fa-twitter"></i
          ></a>

          <!-- Google -->
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
            ><i class="fab fa-google"></i
          ></a>

          <!-- Instagram -->
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
            ><i class="fab fa-instagram"></i
          ></a>

          <!-- Linkedin -->
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
            ><i class="fab fa-linkedin-in"></i
          ></a>

          <!-- Github -->
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
            ><i class="fab fa-github"></i
          ></a>
        </section>
        <!-- Section: Social media -->
      </div>
      <!-- Grid container -->

      <!-- Copyright -->
      <div
        class="text-center p-3"
        style="background-color: rgba(0, 0, 0, 0.2)"
      >
        © 2020 Copyright:
        <a class="text-white" href="https://mdbootstrap.com/"
          >MooMarket.com</a
        >
      </div>
      <!-- Copyright -->
    </footer>
  </div>

<style>
    /* Reset some default styles */
body,
html {
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Ensure the body covers the viewport height */
  position: relative; /* Establish a positioning context for the footer */
}

/* Apply the background image to a div */
.background-image {
  background-image: url("/pictures/371950857_1726992114430925_2559213978550752722_n.jpg"); /* Replace 'your-image.jpg' with the path to your image */
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Put the background image behind other content */
  background-color: rgba(0, 0, 0, 0.2); /* 50% transparent black background */
}

/* Style the content on top of the background image */
.content {
  position: relative;
  z-index: 2; /* Put the content above the background image */
  text-align: center;
  padding: 120px;
  font-family: Arial, sans-serif;
  color: #ece5e5; /* Text color */
  max-height: 100%; /* Set a maximum height for the content */
  overflow-y: auto; /* Add a vertical scrollbar when content overflows */
}

/* Style the heading and paragraph */
h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
}

.logo {
  /* background-image: url("logo.jpg"); */
  position: absolute;
  background-repeat: no-repeat;
  z-index: 3;
  background-size: cover;
  left: 5%;
  /* border-radius: 50%; /* This will create a circular shape */
  /* overflow: hidden; Clip any content that goes beyond the rounded corners */
}

/* Black box styles */
.black-box {
  background-color: rgba(0, 0, 0, 0.9); /* 70% transparent black */
  position: absolute;
  /*top: 50%; /* Position at the vertical center of the page */
  left: 0;
  width: 100%;
  height: 150px; /* Adjust the height as needed */
  transform: translateY(-50%); /* Center the box vertically */
  z-index: 2; /* Place above the background image */
}

/* Third image styles */
.third-image {
  background-image: url("/pictures/344284179_2467827846703415_5573330265391781893_n.jpg"); /* Replace with your third image */
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: 35%; /* two fifth of the page height */
  z-index: 1; /* Place above the background image */
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20%; /* Height of the footer */
}

</style>