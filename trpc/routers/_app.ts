import { candidatesRouter } from '@/features/candidate/server/routers';
import { employersRouter } from '@/features/employer/server/routers';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { adminProcedure, baseProcedure, createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  users: adminProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { name } = input;
      const users = await auth.api.listUsers({
        query: {
          searchValue: name,
          searchField: 'name',
          // searchOperator: 'contains',
          // limit: 100,
          // offset: 100,
          // sortBy: 'name',
          // sortDirection: 'desc',
          // filterField: 'email',
          // filterValue: 'hello@example.com',
          // filterOperator: 'eq',
        },
        // This endpoint requires session cookies.
        headers: await headers(),
      });
      return users;
    }),

  createUser: adminProcedure.mutation(async ({ ctx, input }) => {
    const newUser = await auth.api.createUser({
      body: {
        email: 'user@example.com', // required
        password: 'some-secure-password', // required
        name: 'James Smith', // required
        role: 'employer',
        data: { customField: 'customValue' },
      },
    });
    return newUser.user;
  }),

  employers: employersRouter,
  candidates: candidatesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
