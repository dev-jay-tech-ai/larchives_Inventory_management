import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Stock {
  public _id?: string

  @prop({ required: true })
  public title!: string

  @prop({ required: true, unique: true })
  public barcode!: string

  @prop({ required: true })
  public image!: string

  @prop({ required: true })
  public color!: string

  @prop({ required: true })
  public size!: string

  @prop({ required: true })
  public vendor!: string

  @prop({ required: true, default: 0 })
  public pricePurchase!: number

  @prop({ required: true, default: 0 })
  public price!: number

  @prop({ required: true, default: 0 })
  public countInStock!: number

  @prop({ required: true })
  public link!: string
}

export const StockModel = getModelForClass(Stock)