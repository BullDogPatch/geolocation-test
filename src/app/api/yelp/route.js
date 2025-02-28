export async function GET(req) {
  const API_KEY = process.env.YELP_API_KEY;
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  if (!latitude || !longitude) {
    return Response.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${latitude}&longitude=${longitude}&limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Yelp API error: ${res.statusText}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
