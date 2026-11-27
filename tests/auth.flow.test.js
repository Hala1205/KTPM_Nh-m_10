import { beforeAll, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

vi.mock('pg', () => {
  const users = new Map();
  return {
    default: {
      Pool: class {
        async query(sql, params = []) {
          if (sql.startsWith('insert into users')) {
            const [id, name, email, password] = params;
            const user = { id, name, email, password, role: 'customer', addresses: [] };
            users.set(id, user);
            return { rows: [user] };
          }
          if (sql.includes('where email=$1')) {
            return { rows: [...users.values()].filter((user) => user.email === params[0]) };
          }
          if (sql.includes('where id=$1')) {
            return { rows: users.has(params[0]) ? [users.get(params[0])] : [] };
          }
          throw new Error(`Unexpected query: ${sql}`);
        }
      },
    },
  };
});

let app;
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'auth-flow-test-secret';
  ({ app } = await import('../backend/local-server.js'));
});

describe('registration and login', () => {
  it('keeps the new user signed in and lets them log in again', async () => {
    const client = request.agent(app);
    const email = 'new-user@example.com';
    const password = 'test123456';

    const signup = await client.post('/api/auth/signup').send({ name: 'New User', email, password });
    expect(signup.status).toBe(200);
    expect(signup.body.email).toBe(email);

    const profile = await client.get('/api/auth/profile');
    expect(profile.status).toBe(200);
    expect(profile.body.email).toBe(email);

    const logout = await client.post('/api/auth/logout');
    expect(logout.status).toBe(200);

    const login = await client.post('/api/auth/login').send({ email, password });
    expect(login.status).toBe(200);
    expect((await client.get('/api/auth/profile')).body.email).toBe(email);
  });
});
