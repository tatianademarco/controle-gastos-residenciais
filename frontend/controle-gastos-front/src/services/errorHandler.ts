export function extrairErro(error: any): string {
    return error?.response?.data?.erro 
        || error?.response?.data 
        || error?.message 
        || "Erro inesperado ao comunicar com o servidor";
}