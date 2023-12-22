import { modelOptions, prop, getModelForClass, DocumentType } from "@typegoose/typegoose";

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

  public static async findOrCreateByBarcode(barcode: string, data: Partial<Sheet>): Promise<DocumentType<Sheet>> {
    const existingSheet = await SheetModel.findOne({ barcode })
    if (existingSheet) {
      existingSheet.title = data.title || existingSheet.title;
      existingSheet.color = data.color || existingSheet.color;
      existingSheet.countInStock = data.countInStock || existingSheet.countInStock;
      existingSheet.link = data.link || existingSheet.link;
      await existingSheet.save();
      return existingSheet;
    } else return SheetModel.create({ ...data, barcode })
  }
}

export const SheetModel = getModelForClass(Sheet)