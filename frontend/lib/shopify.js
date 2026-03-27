const SHOPIFY_API_VERSION = "2024-01";

const CREATE_DISCOUNT_MUTATION = `
  mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            codes(first: 1) {
              nodes {
                id
                code
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Crée un discount code dans la boutique Shopify via l'API GraphQL.
 * Utilise discountCodeBasicCreate — scope requis : write_discounts.
 *
 * @param {string} shopDomain      ex: ma-boutique.myshopify.com
 * @param {string} accessToken     token OAuth de la marque
 * @param {string} codeString      ex: ALEX15
 * @param {number} discountPercent ex: 15
 * @returns {{ discount_id: string, code_id: string }}
 */
export async function createShopifyDiscountCode(shopDomain, accessToken, codeString, discountPercent) {
  const endpoint = `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const variables = {
    basicCodeDiscount: {
      title: codeString,
      code: codeString,
      startsAt: new Date().toISOString(),
      customerSelection: { all: true },
      customerGets: {
        value: {
          percentage: discountPercent / 100,
        },
        items: { all: true },
      },
      appliesOncePerCustomer: false,
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query: CREATE_DISCOUNT_MUTATION, variables }),
  });

  const json = await res.json();
  console.log("Shopify GraphQL status :", res.status);
  console.log("Shopify GraphQL body   :", JSON.stringify(json));

  if (!res.ok) {
    throw new Error(`Shopify GraphQL HTTP error: ${res.status}`);
  }

  const result = json.data?.discountCodeBasicCreate;

  if (result?.userErrors?.length > 0) {
    throw new Error(`Shopify userErrors: ${JSON.stringify(result.userErrors)}`);
  }

  const node = result?.codeDiscountNode;
  const codeNode = node?.codeDiscount?.codes?.nodes?.[0];

  return {
    discount_id: node?.id ?? null,
    code_id: codeNode?.id ?? null,
  };
}
