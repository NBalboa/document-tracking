
export const urlToString = (url: string) => {

    return url.split('/')[1].split("?")[0]
}

