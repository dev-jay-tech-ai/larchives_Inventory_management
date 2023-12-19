import { modelOptions, prop, getModelForClass, DocumentType } from "@typegoose/typegoose"

@modelOptions({ schemaOptions: { timestamps: true } })
export class Inventory {
  public _id?: string
  @prop({ required: true, unique: true })
  public inventory_item_id!: number
  @prop({ required: true })
  public available!: number

  public static async findOrCreateByItemId(
    inventory_item_id: number,
    data: Partial<Inventory>): Promise<DocumentType<Inventory>> {
      const existingInventory = await InventoryModel.findOne({ inventory_item_id });
      if (existingInventory) {
        // If inventory with the given inventory_item_id exists, update it with new data
        existingInventory.available = data.available || existingInventory.available;
        // Update other properties as needed
        console.log(data)
        await existingInventory.save();
        return existingInventory;
      } else {
        // If inventory with the given inventory_item_id does not exist, create a new one
        return  InventoryModel.create({ ...data, inventory_item_id });
      }
  }
}

export const InventoryModel = getModelForClass(Inventory)