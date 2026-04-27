/**
 * Restrict path and domains for json / gesx file
 */

const ALLOWED_GRAPH_FILE_PATH = '/graphes/';

const ALLOWED_GRAPH_FILE_DOMAINS  = [
    'lobbycratie.com',
    'www.lobbycratie.com'
 ];


export function validateGraphFileUrl(fileUrl: string): boolean {
    if (fileUrl.startsWith(ALLOWED_GRAPH_FILE_PATH)) {
        return true;
    }
    const url = new URL(fileUrl);
    if (ALLOWED_GRAPH_FILE_DOMAINS.includes(url.hostname)) {
        return true;
    }
    return false;
}





