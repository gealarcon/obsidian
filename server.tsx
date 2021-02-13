import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { ObsidianRouter, gql } from 'https://deno.land/x/obsidian/mod.ts';

const PORT = 8000;

const app = new Application();

const types = (gql as any)`
type Movie {
    id: ID
    title: String
    releaseYear: Int
  }

  type Query {
    getMovie: Movie
  }
`;

const resolvers = {
    Query: {
        getMovie: () => {
          return {
            id: "1",
            title: "Up",
            releaseYear: 2009
          };
        },
      },
};

interface ObsRouter extends Router {
  obsidianSchema?: any;
}

const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  redisPort: 6379,
  useCache: true,
});

// const router = new Router();


// function handlePage(ctx: any) {
//   try {
//     const body = (ReactDomServer as any).renderToString(<App />);
//     ctx.response.body = `<!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <title>SSR React App</title>
//       </head>
//       <body>
//         <div id="root">${body}</div>
//         <script src="/static/client.tsx" defer></script>
//       </body>
//       </html>`;
//   } catch (error) {
//     console.error(error);
//   }
// }
// router.get('/', handlePage);
app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

app.addEventListener('listen', () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });

await app.listen({ port: PORT });

// app.addEventListener('listen', () => {
//     console.log(`Listening at http://localhost:${PORT}`);
//   });