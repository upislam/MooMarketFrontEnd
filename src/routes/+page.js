import { PUBLIC_DOMAIN } from '$env/static/public';
export const load = ()=>{
    var data
    const authenticate = async () => {
        try {
            const response = await fetch(`https://moomarket-dlki.onrender.com/api/authenticate`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if(response.status===204){
                console.log('bolod');
            }
            else{
                data = await response.json();
                
                if (data.success) {
                    data = data.data
                    console.log(data);
                    return data;
                } else {
                    data = data.data
                    return data;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };
    return {auth:authenticate()};
}