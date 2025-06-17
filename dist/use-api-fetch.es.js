import r from "@wordpress/api-fetch";
import { useState as a, useEffect as i } from "react";
const L = (n, e = {}) => {
  const [l, s] = a(null), [d, u] = a(null), [f, o] = a(!1);
  return i(() => {
    const c = new AbortController();
    return e.nonce && (r.use(
      r.createNonceMiddleware({ nonce: e.nonce })
    ), e.nonce = void 0), e.rootURL && (r.use(
      r.createRootURLMiddleware({ rootURL: e.rootURL })
    ), e.rootURL = void 0), (async () => {
      o(!0);
      try {
        const t = await r({
          path: n,
          method: e.method || "GET",
          data: e.data,
          signal: c.signal,
          parse: e.parse !== !1
        });
        s(t);
      } catch (t) {
        u(t);
      } finally {
        o(!1);
      }
    })(), () => c.abort();
  }, [n, JSON.stringify(e)]), { result: l, error: d, loading: f };
};
export {
  L as default
};
