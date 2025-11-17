import Accelerator from "@/app/models/accelerator";
import { connectToDB } from "@/app/lib/mongodb";


import AcceleratorsView from "./AcceleratorsView";

export default async function ItemsList() {
  await connectToDB();
  let items: any[] = [];
  try {
    items = await Accelerator.find({});
  } catch (e) {
    console.error("Failed to load accelerators", e);
    items = [];
  }
  return <AcceleratorsView items={items} />;
}
