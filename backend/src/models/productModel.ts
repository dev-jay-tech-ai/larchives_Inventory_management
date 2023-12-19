import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import { Inventory } from "./inventoryModel";
export class Variant {
  @prop({ required: true, unique: true })
  public variantId!: number
  @prop({ required: true })
  public option!: string
  @prop({ required: true, default: 0 })
  public price!: number;
  @prop({ required: false, defalut: null })
  public pricePurchase!: number;
  @prop({ required: false, defalut: '' })
  public barcode!: string;
  @prop({ required: true, unique: true, ref: Inventory })
  public inventory_item_id!: number;
  @prop({ required: true })
  public inventory_quantity!: number;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id?: string
  @prop({ required: true, unique: true })
  public productId!: number
  @prop({ required: true })
  public title!: string
  @prop({ required: true, unique: true })
  public image!: string
  @prop({ required: true })
  public vendor!: string
  @prop({ required: false, default: '' })
  public link!: string

  @prop({ type: () => [Variant] }) // Add this property to hold the array of Variant objects
  public variants!: Variant[];
}

export const ProductModel = getModelForClass(Product)