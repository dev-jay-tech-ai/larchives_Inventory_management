export interface Shopify {
    id: number;
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    created_at: string;
    handle: string;
    updated_at: string;
    published_at: string;
    template_suffix: string;
    status: string;
    published_scope: string;
    tags: string;
    admin_graphql_api_id: string;
    variants: ShopifyVariant[];
    options: ShopifyOption[];
    images: ShopifyImage[];
}

export interface ShopifyVariant {
  product_id: number;
  id: number;
  title: string;
  price: number;
  sku: null;
  position: number;
  inventory_policy: number;
  compare_at_price: null;
  fulfillment_service: number;
  inventory_management: number;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: null;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface ShopifyOption {
  product_id: number;
  id: number;
  name: string;
  position: number;
  values: string[];
}

export interface ShopifyImage {
  product_id: number;
  id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: string;
  width: number;
  height: number;
  src: string;
  variant_ids: any[]; // You might want to define the type for variant_ids
  admin_graphql_api_id: string;
}

export interface InventoryUpdateAPIResponse {
  inventory_level: {
    inventory_item_id: number;
    location_id: number;
    available: number;
    updated_at: string;
    admin_graphql_api_id: string;
  };
}