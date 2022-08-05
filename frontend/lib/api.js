export function getStrapiURL(path = "") {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api"
        }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
}


export async function getPageData(slug, preview = false) {
    // Find the pages that match this slug
    const pagesData = await fetchAPI(
        `/articles?publicationState=preview&filters[slug][$eq]=${slug}&populate=*`
    );

    // Make sure we found something, otherwise return null
    if (pagesData == null || pagesData.length === 0) {
        return null;
    }

    // Return the first item since there should only be one result per slug
    return pagesData;
}