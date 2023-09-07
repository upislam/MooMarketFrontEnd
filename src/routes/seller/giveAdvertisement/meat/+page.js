import { PUBLIC_DOMAIN } from '$env/static/public';
export const load = ()=>{
    var data
    const authenticate = async () => {
        try {
            const response = await fetch(`${PUBLIC_DOMAIN}/api/seller/giveAdvertisement`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if(response.status===204){
                console.log('mara');
            }
            else{
                data = await response.json();
                
                if (data.success) {
                    return data;
                } else {
                    return data;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return data;
        }
    };
    return {auth:authenticate()};
}