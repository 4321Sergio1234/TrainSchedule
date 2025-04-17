export function writeToken(token: string): void{
    localStorage.setItem('token',JSON.stringify(token));
    return;
}

export function readToken(): string | null{
    const token = localStorage.getItem('token')

    if(token == null){
        return null;
    }

    return JSON.parse(token);
}

export function clearToken(){
    localStorage.removeItem('token');
    return;
}