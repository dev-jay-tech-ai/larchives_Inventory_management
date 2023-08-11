import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Sheet {
  public _id?: string
  @prop({ required: true })
  public title!: string
  @prop({ required: true, unique: true })
  public barcode!: string
  @prop({ required: true })
  public color!: string
  // @prop({ required: true, default: '' })
  // public size!: string;
  @prop({ required: true, default: 0 })
  public countInStock!: number
  @prop({ required: true })
  public link!: string

  public static async findOrCreateByBarcode(barcode: string, data: Partial<Sheet>): Promise<Sheet> {
    const existingSheet = await SheetModel.findOne({ barcode })
    if (existingSheet) return existingSheet
    else return SheetModel.create({ ...data, barcode })
  }
}

export const SheetModel = getModelForClass(Sheet)