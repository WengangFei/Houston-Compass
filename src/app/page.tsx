
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected! Current time:', result[0].now);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await sql.end(); // close the connection
  }
}
//test db connection
testConnection();

export default function Home() {
  return (
    <div>
      hi
    </div>
  );
}
