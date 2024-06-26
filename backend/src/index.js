import { Hono } from 'hono';
import { cors } from 'hono/cors'

const app = new Hono();

app.use('*', cors())

app.get('/', (c) => {
	return c.text('FBLA Nationals welcome');
})

app.get('/getJobs', async (c) => {
	const { DB } = c.env;
	
	if (!DB) {
		return c.text('Database not configured', 500)
	}
  
	try {
		const result = await DB.prepare('SELECT * FROM jobs').all();
		return c.json(JSON.stringify(result));
	} catch (error) {
		return c.text(error.message, 500)
	}
})

// POST never works in browser you need postman
// app.post('/updateJobs', async (c) => {
// 	const body = await c.req.json()
// 	return c.text(`update ${body.id}`, 200);
// })
app.post('/updateSpots', async (c) => {
	const { DB } = c.env;
	const id = c.req.query('id'); 

	if (!DB) {
		return c.text('Database not configured', 500);
	}

	if (!id) {
		return c.text('Job ID is required', 400);
	}

	try {
		const updateQuery = 'UPDATE jobs SET spots = spots - 1 WHERE id = ? AND spots > 0';
		const result = await DB.prepare(updateQuery).bind(id).run();

		if (result.changes === 0) {
			return c.text('No spots available or invalid job ID', 400);
		}
		
		return c.text(`success updates ${result.changes}`)
	} catch (error) {
		return c.text(error.message, 500);
	}
});

export default app






// /**
//  * Welcome to Cloudflare Workers! This is your first worker.
//  *
//  * - Run `npm run dev` in your terminal to start a development server
//  * - Open a browser tab at http://localhost:8787/ to see your worker in action
//  * - Run `npm run deploy` to publish your worker
//  
//  * Learn more at https://developers.cloudflare.com/workers/
//  */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World!');
// 	},
// };
// export default {
// 	async fetch(request, env) {
// 	  const { DB } = env;
// 	  const result = await DB.prepare('SELECT * FROM jobs').all();
// 	  return new Response(JSON.stringify(result));
// 	}
//   }

// export default {
// 	async fetch(request, env) {
// 	  if (!env.DB) {
// 		return new Response('Database not configured', { status: 500 });
// 	  }
  
// 	  try {
// 		const result = await env.DB.prepare('SELECT * FROM jobs').all();
// 		return new Response(JSON.stringify(result), {
// 		  headers: { 'Content-Type': 'application/json' }
// 		});
// 	  } catch (error) {
// 		return new Response(error.message, { status: 500 });
// 	  }
// 	}
//   }
