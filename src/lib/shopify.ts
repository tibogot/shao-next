import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// Check if environment variables are available
const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

let client: any = null;

if (storeDomain && accessToken) {
  client = createStorefrontApiClient({
    storeDomain,
    publicAccessToken: accessToken,
    apiVersion: "2024-10",
  });
}

export async function fetchProducts(limit = 4) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return [];
  }

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

  try {
    const { data } = await client.request(query);
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function fetchAllProducts(pageSize = 12, cursor?: string) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

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

  try {
    const { data } = await client.request(query);
    return data.products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
}

export async function fetchProductByHandle(handle: string) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return null;
  }

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

  try {
    const { data } = await client.request(query);
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
