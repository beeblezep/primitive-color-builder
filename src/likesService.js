const REDIS_URL = import.meta.env.VITE_UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN;

const LOVE_COUNT_KEY = 'love:count';
const LOVE_USERS_KEY = 'love:users';

export const isLoveEnabled = Boolean(REDIS_URL && REDIS_TOKEN);

async function redisPipeline(commands) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis pipeline error: ${res.status}`);
  return res.json();
}

export async function getInitialLoveState(userId) {
  if (!isLoveEnabled) return { count: 0, loved: false };
  try {
    const results = await redisPipeline([
      ['GET', LOVE_COUNT_KEY],
      ['SISMEMBER', LOVE_USERS_KEY, userId],
    ]);
    return {
      count: parseInt(results[0].result, 10) || 0,
      loved: results[1].result === 1,
    };
  } catch (err) {
    console.warn('Failed to fetch love state:', err);
    return { count: 0, loved: false };
  }
}

export async function addLove(userId) {
  try {
    const results = await redisPipeline([
      ['INCR', LOVE_COUNT_KEY],
      ['SADD', LOVE_USERS_KEY, userId],
    ]);
    return parseInt(results[0].result, 10) || 0;
  } catch (err) {
    console.warn('Failed to add love:', err);
    return null;
  }
}

export async function removeLove(userId) {
  try {
    const results = await redisPipeline([
      ['DECR', LOVE_COUNT_KEY],
      ['SREM', LOVE_USERS_KEY, userId],
    ]);
    return parseInt(results[0].result, 10) || 0;
  } catch (err) {
    console.warn('Failed to remove love:', err);
    return null;
  }
}
