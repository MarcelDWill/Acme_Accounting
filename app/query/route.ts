import postgres from 'postgres';
import { NextResponse } from 'next/server';

// Establish database connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Handle GET requests
export async function GET() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

    // Return the data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}


//export async function GET() {
//  return Response.json({
//    message:
//      'Uncomment this file and remove this line. You can delete this file when you are finished.',
//  });
  // try {
  // 	return Response.json(await listInvoices());
  // } catch (error) {
  // 	return Response.json({ error }, { status: 500 });
  // }
//}
