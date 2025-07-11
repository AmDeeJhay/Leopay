// Mock client for development
const createMockClient = () => ({
  auth: {
    signInWithPassword: async () => ({
      data: { user: { id: "mock-user", email: "user@example.com" } },
      error: null,
    }),
    signUp: async () => ({
      data: { user: { id: "mock-user", email: "user@example.com" } },
      error: null,
    }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({
      data: { user: { id: "mock-user", email: "user@example.com" } },
      error: null,
    }),
  },
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      eq: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
})

export const supabase = createMockClient() as any
