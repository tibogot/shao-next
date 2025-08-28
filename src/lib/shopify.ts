import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  apiVersion: "2024-10",
});

export async function fetchProducts(limit = 4) {
  const query = `
    {
      products(first: ${limit}) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) { edges { node { url } } }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;
  const { data } = await client.request(query);
  return data.products.edges.map((edge: any) => edge.node);
}

export async function fetchAllProducts(pageSize = 12, cursor?: string) {
  const query = `
    {
      products(first: ${pageSize}${cursor ? `, after: \"${cursor}\"` : ""}) {
        pageInfo { hasNextPage, endCursor }
        edges {
          node {
            id
            title
            handle
            images(first: 1) { edges { node { url } } }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;
  const { data } = await client.request(query);
  return data.products;
}

export async function fetchProductByHandle(handle: string) {
  const query = `
    {
      product(handle: \"${handle}\") {
        id
        title
        descriptionHtml
        images(first: 4) { edges { node { url } } }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  `;
  const { data } = await client.request(query);
  return data.product;
}
