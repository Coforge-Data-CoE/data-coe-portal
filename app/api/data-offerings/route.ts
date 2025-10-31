// app/api/data-offerings/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import DataOffering from "@/app/models/dataOffering";
import mongoose from "mongoose";

export const runtime = "nodejs";

const DEFAULT_OFFERINGS = [
    "Coforge Supernova",
    "Coforge Hypernova",
    "Coforge Pulsar",
    "Coforge Nebula",
    "Coforge Core",
];

export async function GET() {
    try {
        await connectToDB();
        let doc = await DataOffering.findOne();
        if (!doc) {
            doc = await DataOffering.create({ offerings: DEFAULT_OFFERINGS.map(n => ({ _id: new mongoose.Types.ObjectId(), name: n })) });
        } else if (!Array.isArray(doc.offerings) || !doc.offerings.length) {
            doc.offerings = DEFAULT_OFFERINGS.map(n => ({ _id: new mongoose.Types.ObjectId(), name: n }));
            await doc.save();
        }
        return NextResponse.json([
            { offerings: doc.offerings }
        ], { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
    }
}
