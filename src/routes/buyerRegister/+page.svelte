<script>
    import { PUBLIC_DOMAIN } from '$env/static/public';
    import { goto } from "$app/navigation";
    var districts=[]
    fetch(`${PUBLIC_DOMAIN}/api/register/districts`, {
        method: 'GET'
    })
    .then(res => {
        if (!res.ok) {
        throw new Error('Network response status was vejal');
        }
        return res.json();
    })
    .then(data => {
        districts = [];
        for(let i = 0; i < data.length; i++){
            districts.push(data[i].name);
        }
        districts.sort()
        const parent = document.getElementById('district');
        for(let i = 0; i < districts.length; i++){
            let opt = document.createElement('option');
            opt.value = districts[i];
            opt.innerHTML = districts[i];
            parent.appendChild(opt);
        }
    })
    .catch(err => {
        console.log(err.Error);
    });

    var phoneNumbers
    fetch(`${PUBLIC_DOMAIN}/api/register/phoneNumbers`, {
        method: 'GET'
    })
    .then(res => {
        if (!res.ok) {
        throw new Error('Network response status was vejal');
        }
        return res.json();
    })
    .then(data => {
        phoneNumbers = data;
    })
    .catch(err => {
        console.log(err.Error);
    });

    function districtHandler(){
        var parent = document.getElementById('district');
        const value = parent.value;
        console.log(value);
        let thanas
        fetch(`${PUBLIC_DOMAIN}/api/register/thanas`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                district:value
            })
        })
        .then(res => {
            if (!res.ok) {
            throw new Error('Network response status was vejal');
            }
            return res.json();
        })
        .then(data => {
            thanas = data;
            parent = document.getElementById('thana');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            for(let i = 0; i < thanas.length; i++){
                let opt = document.createElement('option');
                opt.value = thanas[i].name;
                opt.innerHTML = thanas[i].name;
                parent.appendChild(opt);
            }
        })
        .catch(err => {
            console.log(err.Error);
        });
    }

    function passwordHandler(){
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        if(password.value.length < 8){
            document.getElementById('submit').disabled = true;
            document.getElementById('prompt3').innerHTML = "Password must be at least 8 characters long";
        }
        else{
            document.getElementById('prompt3').innerHTML =""
        }
        if(password.value != confirmPassword.value){
            document.getElementById('submit').disabled = true;
            document.getElementById('prompt').innerHTML = "Password doesn't match";
        }
        else{
            document.getElementById('submit').disabled = false;
            document.getElementById('prompt').innerHTML = "";
        }
    }

    function phoneNumberHandler(){
        const phoneNumber = document.getElementById('phone_number');
        if(phoneNumber.value.length != 11){
            document.getElementById('submit').disabled = true;
            document.getElementById('otp_button').disabled = true;
            document.getElementById('prompt2').innerHTML = "Phone number must be 11 digits long";
            return;
        }
        else{
            document.getElementById('submit').disabled = false;
            document.getElementById('otp_button').disabled = false;
            document.getElementById('prompt2').innerHTML =""
        }
        for(let i = 0; i < phoneNumbers.length; i++){
            if(parseInt(phoneNumber.value) == phoneNumbers[i].phone_number){
                document.getElementById('submit').disabled = true;
                document.getElementById('otp_button').disabled = true;
                document.getElementById('prompt2').innerHTML = "Phone number already exists";
                return;
            }
        }
        document.getElementById('submit').disabled = false;
        document.getElementById('otp_button').disabled = false;
        document.getElementById('prompt2').innerHTML = "";
    }

    function otpHandler(){
        fetch(`${PUBLIC_DOMAIN}/api/register/otp`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number:document.getElementById('phone_number').value
            })
        })
        .then(res => {
            if (!res.ok) {
            throw new Error('Network response status was vejal');
            }
            return res.json();
        })
    }
    var name, email, password, phone_number, birth_date, thana, delivery_address,nid,otp

    const formHandler = async ()=>{
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/register/buyersubmit`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name:document.getElementById('name').value,
                    email:document.getElementById('email').value,
                    password:document.getElementById('password').value,
                    phone_number:document.getElementById('phone_number').value,
                    birth_date:document.getElementById('birth_date').value,
                    thana:document.getElementById('thana').value,
                    delivery_address:document.getElementById('delivery_address').value,
                    nid:document.getElementById('nid').value,
                    otp:document.getElementById('otp').value
                })
            });
            const data = await response.json();
            if (data.success) {
                swal({
                    title: "Success!",
                    text: data.message,
                });
                await goto("/login", { replaceState: false, noScroll: false });
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

    <a href="/buyerRegister" class="button"><button class="btn btn-primary">Buyer</button></a>
    <a href="/sellerRegister" class="button"><button class="btn btn-primary">Seller</button></a>
    
    <div class="container">
        <form class="col g-3" on:submit|preventDefault={formHandler}>
            <div class="col-auto">
              <label for="Name" class="col-sm-2 col-form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name"placeholder="Name" bind:value={name} required>
            </div>
            <div class="col-auto">
              <label for="Email" class="col-sm-2 col-form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Email" bind:value={email} required>
            </div>
            <div class="col-auto">
                <label for="inputPassword2" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" bind:value={password} placeholder="Password" on:input={passwordHandler} required>
            </div>
            <label for="prompt" class="form-label" id="prompt3" style="color: red;"></label>
            <div class="col-auto">
              <label for="Confirm Password" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" on:input={passwordHandler} required>
            </div>
            <label for="prompt" class="form-label" id="prompt" style="color: red;"></label>
            <div class="col-auto">
              <label for="Phone number" class="form-label">Phone number</label>
              <input type="number" class="form-control" id="phone_number" name="phone_number" bind:value={phone_number} placeholder="phone number" on:input={phoneNumberHandler} required>
            </div>
            <label for="prompt2" class="form-label" id="prompt2" style="color: red;"></label>
            <div class="col-auto">
              <button id="otp_button" class="btn btn-primary mb-3" on:click={otpHandler} disabled>Send OTP</button>
            </div>
            <div class="col-auto">
              <label for="otp" class="form-label">OTP</label>
              <input type="number" class="form-control" id="otp" name="otp" placeholder="OTP" bind:value={otp} required>
            </div>
            <div class="col-auto">
              <label for="Birth date" class="form-label">Birth date</label>
              <input type="date" class="form-control" id="birth_date" name="birth_date" placeholder="Birth date" bind:value={birth_date} required>
            </div>
            <div class="col-auto">
              <label for="NID" class="form-label">NID</label>
              <input type="number" class="form-control" id="nid" name="nid" placeholder="NID" bind:value={nid}>
            </div>
            <div class="col-auto">
              <label for="District" class="form-label">District</label>
              <select id="district" name="district" class="form-select" aria-label=".form-select" on:change={districtHandler} required>
                <option value="">None</option>
              </select>
            </div>
            <div class="col-auto">
              <label for="Thana" class="form-label">Thana</label>
              <select id="thana" name="thana" class="form-select" aria-label=".form-select" bind:value={thana} required>
              </select>
            </div>
            <div class="mb-3">
              <label for="Delivery Address" class="form-label">Delivery Address</label>
              <textarea class="form-control" id="delivery_address" name="delivery_address" rows="2" placeholder="Delivery Address" bind:value={delivery_address} required></textarea>
            </div>
            <br>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="agree" required>
              <label class="form-check-label" for="flexCheckDefault">
                I agree with term and conditions
              </label>
            </div>
            
            <div class="col-auto">
                <button id="submit" type="submit" class="btn btn-primary mb-3" disabled>Submit</button>
            </div>
        </form>
    </div>