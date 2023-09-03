import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('Rayab');
    const Misc = await db.collection('misc');
    const misc = await Misc.find({}).toArray();

    let json_response = {
      status: true,
      misc: misc,
    };
    return NextResponse.json(json_response);
  } catch (error) {
    let json_response = {
      status: false,
      results: 'some error occured',
      error: error,
    };
    return NextResponse.json(json_response, {
      status: 500,
      headers: {
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  }
}
