export const load = ({fetch,params})=>{
    const verify = async () => {
        try {
            const response = await fetch(`https://moomarket-dlki.onrender.com/api/login/forgetPassword/verify/${params.token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };
    return {params:verify()};
}